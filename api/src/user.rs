use crate::error::ServerResult;
use anyhow::Context;
use poem::{web::Data, Request};
use poem_openapi::{
    auth::Bearer,
    param::Path,
    payload::{Json, PlainText},
    Object, OpenApi, SecurityScheme,
};
use sqlx::SqlitePool;

#[derive(Debug, Object)]
pub struct User {
    pub email: String,
    pub hashed_password: String,
    pub is_admin: bool,
    pub first_name: String,
    pub last_name: String,
    pub street: String,
    pub postal_code: String,
    pub city: String,
}

#[derive(SecurityScheme)]
#[oai(
    ty = "bearer",
    key_name = "Authorization",
    key_in = "header",
    checker = "auth_checker"
)]
pub struct AuthToken(User);

async fn auth_checker(request: &Request, api_key: Bearer) -> Option<User> {
    todo!()
}

pub struct UserApi;

#[OpenApi]
impl UserApi {
    #[oai(path = "/user/register", method = "get")]
    async fn register(&self, db: Data<&SqlitePool>) -> ServerResult<PlainText<String>> {
        // let categories = sqlx::query_as!(Category, "SELECT name, description FROM category")
        //     .fetch_all(db.0)
        //     .await
        //     .context("fetch categories")?;

        // Ok(Json(categories))
        todo!()
    }
}
