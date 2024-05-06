use crate::{error::ServerResult, ApiTags, ServerKey};
use anyhow::Context;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, PasswordHash, PasswordVerifier,
};
use jwt::{SignWithKey, VerifyWithKey};
use poem::{web::Data, Request};
use poem_openapi::{
    auth::Bearer,
    payload::{Json, PlainText},
    ApiResponse, Object, OpenApi, SecurityScheme,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthenticatedUser {
    pub id: i64,
    pub is_admin: bool,
}

/// Authentication token that gets decoded to `AuthenticatedUser`
#[derive(SecurityScheme)]
#[oai(
    ty = "bearer",
    key_name = "Authorization",
    key_in = "header",
    checker = "auth_checker"
)]
pub struct AuthToken(pub AuthenticatedUser);

/// Verify JWT token
async fn auth_checker(request: &Request, token: Bearer) -> Option<AuthenticatedUser> {
    let server_key = request.data::<ServerKey>().expect("defined server key");

    let token = token.token.as_str();
    let result = VerifyWithKey::<AuthenticatedUser>::verify_with_key(token, server_key);

    result.ok()
}

#[derive(Debug, Object)]
struct ReigsterUserBody {
    pub email: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub street: String,
    pub postal_code: String,
    pub city: String,
}

#[derive(ApiResponse)]
enum RegisterUserResponse {
    /// The user has been successfully registered, and authentication token is returned
    #[oai(status = 200)]
    Success(PlainText<String>),

    /// A user with the given email already exists
    #[oai(status = 409)]
    Conflict,
}

#[derive(Debug, Object)]
struct LoginUserBody {
    pub email: String,
    pub password: String,
}

#[derive(ApiResponse)]
enum LoginUserResponse {
    /// Successfully logged in, and authentication token is returned
    #[oai(status = 200)]
    Success(PlainText<String>),

    /// Wrong email or password
    #[oai(status = 401)]
    Unauthorized,
}

pub struct UserApi;

#[OpenApi(tag = ApiTags::User)]
impl UserApi {
    #[oai(path = "/user/register", method = "post")]
    async fn register(
        &self,
        Json(body): Json<ReigsterUserBody>,
        Data(db): Data<&SqlitePool>,
        Data(server_key): Data<&ServerKey>,
    ) -> ServerResult<RegisterUserResponse> {
        let ReigsterUserBody {
            email,
            password,
            first_name,
            last_name,
            street,
            postal_code,
            city,
        } = body;

        let existing_user = sqlx::query!("SELECT email FROM user WHERE email = ?", email)
            .fetch_optional(db)
            .await
            .context("fetch existing user")?;

        if existing_user.is_some() {
            return Ok(RegisterUserResponse::Conflict);
        }

        let password_salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let hashed_passowrd = argon2
            .hash_password(password.as_bytes(), &password_salt)
            .map_err(|err| anyhow::anyhow!(err))
            .context("hash password")?
            .to_string();

        let row = sqlx::query!("
                INSERT INTO user (email, hashed_password, first_name, last_name, street, postal_code, city)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                returning id, is_admin
            ", email, hashed_passowrd, first_name, last_name, street, postal_code, city)
            .fetch_one(db)
            .await
            .context("insert user")?;

        let id = row.id;
        let is_admin = row.is_admin != 0;

        let authenticated_user = AuthenticatedUser { id, is_admin };
        let auth_token = authenticated_user
            .sign_with_key(server_key)
            .context("sign jwt")?;

        Ok(RegisterUserResponse::Success(PlainText(auth_token)))
    }

    #[oai(path = "/user/login", method = "post")]
    async fn login(
        &self,
        Json(body): Json<LoginUserBody>,
        Data(db): Data<&SqlitePool>,
        Data(server_key): Data<&ServerKey>,
    ) -> ServerResult<LoginUserResponse> {
        let LoginUserBody { email, password } = body;

        let row = sqlx::query!(
            "SELECT id, hashed_password, is_admin FROM user WHERE email = ?",
            email
        )
        .fetch_optional(db)
        .await
        .context("fetch user")?;

        let Some(row) = row else {
            return Ok(LoginUserResponse::Unauthorized);
        };

        let id = row.id;
        let hashed_password = row.hashed_password;
        let is_admin = row.is_admin != 0;

        let hashed_password = PasswordHash::new(&hashed_password)
            .map_err(|err| anyhow::anyhow!(err))
            .context("parse password hash")?;

        let argon2 = Argon2::default();
        let is_valid = argon2
            .verify_password(password.as_bytes(), &hashed_password)
            .is_ok();

        if is_valid {
            let authenticated_user = AuthenticatedUser { id, is_admin };
            let auth_token = authenticated_user
                .sign_with_key(server_key)
                .context("sign jwt")?;

            Ok(LoginUserResponse::Success(PlainText(auth_token)))
        } else {
            Ok(LoginUserResponse::Unauthorized)
        }
    }
}
