use crate::{auth::AuthenticatedUser, error::ServerResult, ApiTags, ServerKey};
use anyhow::Context;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, PasswordHash, PasswordVerifier,
};
use poem::web::Data;
use poem_openapi::{
    payload::{Json, PlainText},
    ApiResponse, Object, OpenApi,
};
use sqlx::SqlitePool;

fn hash_password(password: &str) -> ServerResult<String> {
    let password_salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let hashed_passowrd = argon2
        .hash_password(password.as_bytes(), &password_salt)
        .map_err(|err| anyhow::anyhow!(err))
        .context("hash password")?
        .to_string();

    Ok(hashed_passowrd)
}

fn verify_password(password: &str, hashed_password: &str) -> ServerResult<bool> {
    let hashed_password = PasswordHash::new(hashed_password)
        .map_err(|err| anyhow::anyhow!(err))
        .context("parse password hash")?;

    let argon2 = Argon2::default();
    let is_valid = argon2
        .verify_password(password.as_bytes(), &hashed_password)
        .is_ok();

    Ok(is_valid)
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
    /// Make new user admin, ONLY for testing purposes, would be removed in a real application
    pub is_admin: bool,
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
            is_admin,
        } = body;

        let existing_user = sqlx::query!("SELECT email FROM user WHERE email = ?", email)
            .fetch_optional(db)
            .await
            .context("fetch existing user")?;

        if existing_user.is_some() {
            return Ok(RegisterUserResponse::Conflict);
        }

        let hashed_passowrd = hash_password(&password)?;

        let row = sqlx::query!("
                INSERT INTO user (email, hashed_password, first_name, last_name, street, postal_code, city, is_admin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                returning id
            ", email, hashed_passowrd, first_name, last_name, street, postal_code, city, is_admin)
            .fetch_one(db)
            .await
            .context("insert user")?;

        let id = row.id;

        let authenticated_user = AuthenticatedUser { id };
        let auth_token = authenticated_user.sign(server_key)?;

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
            "SELECT id, hashed_password FROM user WHERE email = ?",
            email
        )
        .fetch_optional(db)
        .await
        .context("fetch user")?;

        let Some(row) = row else {
            return Ok(LoginUserResponse::Unauthorized);
        };

        let id = row.id;
        let password_is_correct = verify_password(&password, &row.hashed_password)?;

        if password_is_correct {
            let authenticated_user = AuthenticatedUser { id };
            let auth_token = authenticated_user.sign(server_key)?;

            Ok(LoginUserResponse::Success(PlainText(auth_token)))
        } else {
            Ok(LoginUserResponse::Unauthorized)
        }
    }
}
