use crate::{error::ServerResult, user::AuthToken};
use anyhow::Context;
use poem::web::Data;
use poem_openapi::{param::Path, payload::Json, Object};
use sqlx::SqlitePool;

#[derive(Debug, Object)]
pub struct Category {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
}

#[derive(Debug, Object)]
pub struct CreateCategoryBody {
    pub name: String,
    pub description: Option<String>,
}

#[derive(ApiResponse)]
enum CreateCategoryResponse {
    /// Returns the ID of the created category
    #[oai(status = 200)]
    Created(Json<i64>),

    /// The user is not authorized to create a category
    #[oai(status = 401)]
    Unauthorized,
}

pub struct CategoryApi;

#[OpenApi]
impl CategoryApi {
    #[oai(path = "/categories", method = "get")]
    async fn all_categories(&self, db: Data<&SqlitePool>) -> ServerResult<Json<Vec<Category>>> {
        let categories = sqlx::query_as!(Category, "SELECT id, name, description FROM category")
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
            "SELECT id, name, description FROM category WHERE id = ?",
            id.0
        )
        .fetch_one(db.0)
        .await
        .context("fetch category")?;

        Ok(Json(category))
    }

    #[oai(path = "/categories", method = "post")]
    async fn create_category(
        &self,
        db: Data<&SqlitePool>,
        category: Json<CreateCategoryBody>,
        user: AuthToken,
    ) -> ServerResult<CreateCategoryResponse> {
        if !user.0.is_admin {
            return Ok(CreateCategoryResponse::Unauthorized);
        }

        let row = sqlx::query!(
            "INSERT INTO category (name, description) VALUES (?, ?) RETURNING id",
            category.name,
            category.description
        )
        .fetch_one(db.0)
        .await
        .context("create category")?;

        let id = row.id;

        Ok(CreateCategoryResponse::Created(Json(id)))
    }
}
