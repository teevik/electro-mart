use crate::{auth::AuthToken, error::ServerResult, ApiTags};
use anyhow::Context;
use poem::web::Data;
use poem_openapi::{param::Path, payload::Json, ApiResponse, Object, OpenApi};
use sqlx::SqlitePool;

#[derive(Debug, Object)]
pub struct Brand {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
}

#[derive(ApiResponse)]
enum BrandByIdResponse {
    #[oai(status = 200)]
    Found(Json<Brand>),

    #[oai(status = 404)]
    NotFound,
}

#[derive(Debug, Object)]
pub struct BrandBody {
    #[oai(validator(min_length = 1, max_length = 255))]
    pub name: String,
    #[oai(validator(min_length = 1, max_length = 65535))]
    pub description: Option<String>,
}

#[derive(ApiResponse)]
enum CreateBrandResponse {
    /// Returns the ID of the created brand
    #[oai(status = 201)]
    Created(Json<i64>),

    /// The user is not authorized to create a brand
    #[oai(status = 401)]
    Unauthorized,
}

#[derive(ApiResponse)]
enum UpdateBrandResponse {
    /// The brand has been successfully updated
    #[oai(status = 204)]
    Updated,

    /// The user is not authorized to update a brand
    #[oai(status = 401)]
    Unauthorized,
}

#[derive(ApiResponse)]
enum DeleteBrandResponse {
    /// The brand has been successfully deleted
    #[oai(status = 204)]
    Deleted,

    /// The user is not authorized to delete a brand
    #[oai(status = 401)]
    Unauthorized,

    /// The brand with the given ID does not exist
    #[oai(status = 404)]
    NotFound,

    /// The brand is in use and cannot be deleted
    #[oai(status = 409)]
    Conflict,
}

pub struct BrandApi;

#[OpenApi(tag = ApiTags::Brand)]
impl BrandApi {
    #[oai(path = "/brands", method = "get")]
    async fn all_brands(&self, Data(db): Data<&SqlitePool>) -> ServerResult<Json<Vec<Brand>>> {
        let brands = sqlx::query_as!(Brand, "SELECT id, name, description FROM brand")
            .fetch_all(db)
            .await
            .context("fetch brands")?;

        Ok(Json(brands))
    }

    #[oai(path = "/brands/:id", method = "get")]
    async fn brand_by_id(
        &self,
        Path(id): Path<i64>,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<BrandByIdResponse> {
        let brand = sqlx::query_as!(
            Brand,
            "SELECT id, name, description FROM brand WHERE id = ?",
            id
        )
        .fetch_optional(db)
        .await
        .context("fetch brand")?;

        Ok(match brand {
            Some(brand) => BrandByIdResponse::Found(Json(brand)),
            None => BrandByIdResponse::NotFound,
        })
    }

    /// ADMIN
    #[oai(path = "/brands", method = "post")]
    async fn create_brand(
        &self,
        Json(brand): Json<BrandBody>,
        Data(db): Data<&SqlitePool>,
        AuthToken(user): AuthToken,
    ) -> ServerResult<CreateBrandResponse> {
        if !user.is_admin(db).await? {
            return Ok(CreateBrandResponse::Unauthorized);
        }

        let inserted = sqlx::query!(
            "INSERT INTO brand (name, description) VALUES (?, ?) RETURNING id",
            brand.name,
            brand.description
        )
        .fetch_one(db)
        .await
        .context("create brand")?;

        Ok(CreateBrandResponse::Created(Json(inserted.id)))
    }

    /// ADMIN
    #[oai(path = "/brands/:id", method = "put")]
    async fn update_brand(
        &self,
        Path(id): Path<i64>,
        Json(brand): Json<BrandBody>,
        Data(db): Data<&SqlitePool>,
        AuthToken(user): AuthToken,
    ) -> ServerResult<UpdateBrandResponse> {
        if !user.is_admin(db).await? {
            return Ok(UpdateBrandResponse::Unauthorized);
        }

        sqlx::query!(
            "UPDATE brand SET name = ?, description = ? WHERE id = ?",
            brand.name,
            brand.description,
            id
        )
        .execute(db)
        .await
        .context("update brand")?;

        Ok(UpdateBrandResponse::Updated)
    }

    /// ADMIN
    #[oai(path = "/brands/:id", method = "delete")]
    async fn delete_brand(
        &self,
        Path(id): Path<i64>,
        Data(db): Data<&SqlitePool>,
        AuthToken(user): AuthToken,
    ) -> ServerResult<DeleteBrandResponse> {
        if !user.is_admin(db).await? {
            return Ok(DeleteBrandResponse::Unauthorized);
        }

        let row = sqlx::query!("DELETE FROM brand WHERE id = ?", id)
            .execute(db)
            .await;

        match row {
            Ok(row) => {
                if row.rows_affected() == 0 {
                    return Ok(DeleteBrandResponse::NotFound);
                }

                Ok(DeleteBrandResponse::Deleted)
            }
            Err(error) => match error {
                // Check if error is a foreign key violation
                sqlx::Error::Database(_) => Ok(DeleteBrandResponse::Conflict),

                // Otherwise internal server error
                _ => Err(anyhow::anyhow!(error).context("delete brand").into()),
            },
        }
    }
}
