use crate::{error::ServerResult, ServerKey};
use anyhow::Context;
use jwt::{SignWithKey, VerifyWithKey};
use poem::Request;
use poem_openapi::{auth::Bearer, SecurityScheme};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;

/// A user that has been authenticated from a JWT token
#[derive(Debug, Serialize, Deserialize)]
pub struct AuthenticatedUser {
    pub id: i64,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
}

impl AuthenticatedUser {
    pub fn verify(token: &str, server_key: &ServerKey) -> Option<Self> {
        let result = token.verify_with_key(server_key);

        result.ok()
    }

    pub fn sign(&self, server_key: &ServerKey) -> ServerResult<String> {
        let token = self.sign_with_key(server_key).context("sign token")?;

        Ok(token)
    }

    pub async fn is_admin(&self, db: &SqlitePool) -> ServerResult<bool> {
        let user = sqlx::query!("SELECT is_admin FROM user WHERE id = ?", self.id)
            .fetch_optional(db)
            .await
            .context("fetch user")?;

        let is_admin = user.map(|user| user.is_admin == 1).unwrap_or(false);

        Ok(is_admin)
    }
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
    AuthenticatedUser::verify(token, server_key)
}
