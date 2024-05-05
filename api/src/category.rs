use crate::{error::ServerResult, user::AuthToken, ApiTags};
use anyhow::Context;
use poem::web::Data;
use poem_openapi::{param::Path, payload::Json, ApiResponse, Object, OpenApi};
use sqlx::SqlitePool;

#[derive(Debug, Object)]
pub struct Category {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
}

#[derive(ApiResponse)]
enum CategoryByIdResponse {
    #[oai(status = 200)]
    Found(Json<Category>),

    #[oai(status = 404)]
    NotFound,
}

#[derive(Debug, Object)]
pub struct CategoryBody {
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

#[derive(ApiResponse)]
enum UpdateCategoryResponse {
    /// The category has been successfully updated
    #[oai(status = 204)]
    Updated,

    /// The user is not authorized to update a category
    #[oai(status = 401)]
    Unauthorized,
}

#[derive(ApiResponse)]
enum DeleteCategoryResponse {
    /// The category has been successfully deleted
    #[oai(status = 204)]
    Deleted,

    /// The user is not authorized to delete a category
    #[oai(status = 401)]
    Unauthorized,

    /// The category with the given ID does not exist
    #[oai(status = 404)]
    NotFound,

    /// The category is in use and cannot be deleted
    #[oai(status = 409)]
    Conflict,
}

pub struct CategoryApi;

#[OpenApi(tag = ApiTags::Category)]
impl CategoryApi {
    #[oai(path = "/categories", method = "get")]
    async fn all_categories(
        &self,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<Json<Vec<Category>>> {
        let categories = sqlx::query_as!(Category, "SELECT id, name, description FROM category")
            .fetch_all(db)
            .await
            .context("fetch categories")?;

        Ok(Json(categories))
    }

    #[oai(path = "/categories/:id", method = "get")]
    async fn category_by_id(
        &self,
        Path(id): Path<i64>,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<CategoryByIdResponse> {
        let category = sqlx::query_as!(
            Category,
            "SELECT id, name, description FROM category WHERE id = ?",
            id
        )
        .fetch_optional(db)
        .await
        .context("fetch category")?;

        Ok(match category {
            Some(category) => CategoryByIdResponse::Found(Json(category)),
            None => CategoryByIdResponse::NotFound,
        })
    }

    #[oai(path = "/categories", method = "post")]
    async fn create_category(
        &self,
        Json(category): Json<CategoryBody>,
        Data(db): Data<&SqlitePool>,
        AuthToken(user): AuthToken,
    ) -> ServerResult<CreateCategoryResponse> {
        if !user.is_admin {
            return Ok(CreateCategoryResponse::Unauthorized);
        }

        let inserted = sqlx::query!(
            "INSERT INTO category (name, description) VALUES (?, ?) RETURNING id",
            category.name,
            category.description
        )
        .fetch_one(db)
        .await
        .context("create category")?;

        Ok(CreateCategoryResponse::Created(Json(inserted.id)))
    }

    #[oai(path = "/categories/:id", method = "put")]
    async fn update_category(
        &self,
        Path(id): Path<i64>,
        Json(category): Json<CategoryBody>,
        Data(db): Data<&SqlitePool>,
        AuthToken(user): AuthToken,
    ) -> ServerResult<UpdateCategoryResponse> {
        if !user.is_admin {
            return Ok(UpdateCategoryResponse::Unauthorized);
        }

        sqlx::query!(
            "UPDATE category SET name = ?, description = ? WHERE id = ?",
            category.name,
            category.description,
            id
        )
        .execute(db)
        .await
        .context("update category")?;

        Ok(UpdateCategoryResponse::Updated)
    }

    #[oai(path = "/categories/:id", method = "delete")]
    async fn delete_category(
        &self,
        Path(id): Path<i64>,
        Data(db): Data<&SqlitePool>,
        AuthToken(user): AuthToken,
    ) -> ServerResult<DeleteCategoryResponse> {
        if !user.is_admin {
            return Ok(DeleteCategoryResponse::Unauthorized);
        }

        let row = sqlx::query!("DELETE FROM category WHERE id = ?", id)
            .execute(db)
            .await;

        match row {
            Ok(row) => {
                if row.rows_affected() == 0 {
                    return Ok(DeleteCategoryResponse::NotFound);
                }

                Ok(DeleteCategoryResponse::Deleted)
            }
            Err(error) => match error {
                // Check if error is a foreign key violation
                sqlx::Error::Database(_) => Ok(DeleteCategoryResponse::Conflict),

                // Otherwise internal server error
                _ => Err(anyhow::anyhow!(error).context("delete category").into()),
            },
        }
    }
}
