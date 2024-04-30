use crate::error::ServerResult;
use anyhow::Context;
use poem::web::Data;
use poem_openapi::{param::Path, payload::Json, Object, OpenApi};
use sqlx::SqlitePool;

#[derive(Debug, Object)]
pub struct Category {
    pub name: String,
    pub description: Option<String>,
}

pub struct CategoryApi;

#[OpenApi]
impl CategoryApi {
    #[oai(path = "/categories", method = "get")]
    async fn all_categories(&self, db: Data<&SqlitePool>) -> ServerResult<Json<Vec<Category>>> {
        let categories = sqlx::query_as!(Category, "SELECT name, description FROM category")
            .fetch_all(db.0)
            .await
            .context("fetch categories")?;

        Ok(Json(categories))
    }

    #[oai(path = "/categories/:id", method = "get")]
    async fn category_by_id(
        &self,
        db: Data<&SqlitePool>,
        id: Path<i64>,
    ) -> ServerResult<Json<Category>> {
        let category = sqlx::query_as!(
            Category,
            "SELECT name, description FROM category WHERE id = ?",
            id.0
        )
        .fetch_one(db.0)
        .await
        .context("fetch category")?;

        Ok(Json(category))
    }
}
