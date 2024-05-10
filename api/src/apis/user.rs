use crate::{
    auth::AuthenticatedUser,
    error::ServerResult,
    password::{hash_password, verify_password},
    ApiTags, ServerKey,
};
use anyhow::Context;
use poem::web::Data;
use poem_openapi::{
    payload::{Json, PlainText},
    types::{Email, Password},
    ApiResponse, Object, OpenApi,
};
use sqlx::SqlitePool;

#[derive(Debug, Object)]
struct ReigsterUserBody {
    #[oai(validator(min_length = 1, max_length = 255))]
    pub email: Email,
    #[oai(validator(min_length = 1, max_length = 255))]
    pub password: Password,
    #[oai(validator(min_length = 1, max_length = 255))]
    pub first_name: String,
    #[oai(validator(min_length = 1, max_length = 255))]
    pub last_name: String,
    #[oai(validator(min_length = 1, max_length = 255))]
    pub street: String,
    #[oai(validator(min_length = 1, max_length = 255))]
    pub postal_code: String,
    #[oai(validator(min_length = 1, max_length = 255))]
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
    pub email: Email,
    pub password: Password,
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

        let Email(email) = email;
        let Password(password) = password;

        let existing_user = sqlx::query!("SELECT email FROM user WHERE email = ?", email)
            .fetch_optional(db)
            .await
            .context("fetch existing user")?;

        if existing_user.is_some() {
            return Ok(RegisterUserResponse::Conflict);
        }

        let hashed_passowrd = hash_password(password).await?;

        let row = sqlx::query!("
                INSERT INTO user (email, hashed_password, first_name, last_name, street, postal_code, city, is_admin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                returning id
            ", email, hashed_passowrd, first_name, last_name, street, postal_code, city, is_admin)
            .fetch_one(db)
            .await
            .context("insert user")?;

        let id = row.id;

        let authenticated_user = AuthenticatedUser {
            id,
            email,
            first_name,
            last_name,
        };
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

        let Email(email) = email;
        let Password(password) = password;

        let row = sqlx::query!(
            "SELECT id, first_name, last_name, hashed_password FROM user WHERE email = ?",
            email
        )
        .fetch_optional(db)
        .await
        .context("fetch user")?;

        let Some(row) = row else {
            return Ok(LoginUserResponse::Unauthorized);
        };

        let password_is_correct = verify_password(password, row.hashed_password).await?;

        if password_is_correct {
            let id = row.id;
            let first_name = row.first_name;
            let last_name = row.last_name;

            let authenticated_user = AuthenticatedUser {
                id,
                email,
                first_name,
                last_name,
            };

            let auth_token = authenticated_user.sign(server_key)?;

            Ok(LoginUserResponse::Success(PlainText(auth_token)))
        } else {
            Ok(LoginUserResponse::Unauthorized)
        }
    }
}
