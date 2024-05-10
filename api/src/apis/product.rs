use super::{brand::Brand, category::Category};
use crate::{auth::AuthToken, error::ServerResult, ApiTags};
use anyhow::Context;
use chrono::NaiveDateTime;
use poem::web::Data;
use poem_openapi::{
    param::{Path, Query},
    payload::Json,
    ApiResponse, Enum, Object, OpenApi,
};
use sqlx::SqlitePool;
use std::fmt::{self, Display, Formatter};

#[derive(Debug, Object)]
struct Product {
    id: i64,
    name: String,
    description: String,
    image_url: String,
    price: f64,
    stock_quantity: i64,
    created_at: NaiveDateTime,
    brand: Brand,
    category: Category,
}

#[derive(Debug, Object)]
struct ProductBody {
    #[oai(validator(min_length = 1, max_length = 255))]
    name: String,
    #[oai(validator(min_length = 1, max_length = 65535))]
    description: String,
    #[oai(validator(min_length = 1, max_length = 255))]
    image_url: String,
    #[oai(validator(minimum(value = "0", exclusive = "false")))]
    price: f64,
    #[oai(validator(minimum(value = "0", exclusive = "false")))]
    stock_quantity: i64,
    brand_id: i64,
    category_id: i64,
}

#[derive(ApiResponse)]
enum ProductByIdResponse {
    #[oai(status = 200)]
    Found(Json<Product>),

    #[oai(status = 404)]
    NotFound,
}

#[derive(ApiResponse)]
enum CreateProductResponse {
    /// Returns the ID of the created product
    #[oai(status = 201)]
    Created(Json<i64>),

    /// The user is not authorized to create a product
    #[oai(status = 401)]
    Unauthorized,
}

#[derive(ApiResponse)]
enum UpdateProductResponse {
    /// The product has been successfully updated
    #[oai(status = 204)]
    Updated,

    /// The user is not authorized to update a product
    #[oai(status = 401)]
    Unauthorized,

    /// The product does not exist
    #[oai(status = 404)]
    NotFound,
}

#[derive(ApiResponse)]
enum DeleteProductResponse {
    /// The product has been successfully deleted
    #[oai(status = 204)]
    Deleted,

    /// The user is not authorized to delete a product
    #[oai(status = 401)]
    Unauthorized,

    /// The product does not exist
    #[oai(status = 404)]
    NotFound,
}

#[derive(Enum)]
pub enum SortBy {
    Created,
    Price,
    Name,
}

impl Display for SortBy {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        match self {
            SortBy::Created => write!(f, "Created"),
            SortBy::Price => write!(f, "Price"),
            SortBy::Name => write!(f, "Name"),
        }
    }
}

#[derive(Enum)]
pub enum SortDirection {
    Ascending,
    Descending,
}

impl Display for SortDirection {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        match self {
            SortDirection::Ascending => write!(f, "Ascending"),
            SortDirection::Descending => write!(f, "Descending"),
        }
    }
}

pub struct ProductApi;

fn default_sort_by() -> SortBy {
    SortBy::Created
}

fn default_sort_direction() -> SortDirection {
    SortDirection::Descending
}

fn default_take() -> i64 {
    20
}

fn default_skip() -> i64 {
    0
}

#[OpenApi(tag = ApiTags::Product)]
impl ProductApi {
    #[oai(path = "/products", method = "get", operation_id = "allProducts")]
    async fn all_products(
        &self,
        /// Search products by name
        Query(search): Query<Option<String>>,
        /// Sort products
        #[oai(default = "default_sort_by")]
        Query(sort_by): Query<SortBy>,
        /// Sort direction
        #[oai(default = "default_sort_direction")]
        Query(sort_direction): Query<SortDirection>,
        /// Amount of products to query
        #[oai(default = "default_take")]
        Query(take): Query<i64>,
        /// Skip amount of products
        #[oai(default = "default_skip")]
        Query(skip): Query<i64>,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<Json<Vec<Product>>> {
        let search = search.unwrap_or_default();
        let sort_by = sort_by.to_string();
        let sort_direction = sort_direction.to_string();

        let products = sqlx::query!(
            "
                SELECT
                    product.id,
                    product.name,
                    product.description,
                    image_url,
                    price,
                    stock_quantity,
                    created_at,
                    brand.id AS brand_id,
                    brand.name AS brand_name,
                    brand.description AS brand_description,
                    category.id AS category_id,
                    category.name AS category_name,
                    category.description AS category_description
                FROM product
                INNER JOIN brand ON product.brand_id = brand.id
                INNER JOIN category ON product.category_id = category.id
                WHERE
                    product.name LIKE '%' || $1 || '%'
                ORDER BY
                    (CASE WHEN $3 = 'Ascending' THEN CASE $2
                        WHEN 'Created' THEN product.created_at
                        WHEN 'Price' THEN product.price
                        WHEN 'Name' THEN product.name
                    END END) ASC,
                    (CASE WHEN $3 = 'Descending' THEN CASE $2
                        WHEN 'Created' THEN product.created_at
                        WHEN 'Price' THEN product.price
                        WHEN 'Name' THEN product.name
                    END END) DESC
                    LIMIT $4 OFFSET $5
            ",
            search,
            sort_by,
            sort_direction,
            take,
            skip
        )
        .fetch_all(db)
        .await
        .context("fetch products")?;

        let products = products
            .into_iter()
            .map(|product| Product {
                id: product.id,
                name: product.name,
                description: product.description,
                image_url: product.image_url,
                price: product.price,
                stock_quantity: product.stock_quantity,
                created_at: product.created_at,
                brand: Brand {
                    id: product.brand_id,
                    name: product.brand_name,
                    description: product.brand_description,
                },
                category: Category {
                    id: product.category_id,
                    name: product.category_name,
                    description: product.category_description,
                },
            })
            .collect();

        Ok(Json(products))
    }

    #[oai(path = "/products/:id", method = "get", operation_id = "productById")]
    async fn product_by_id(
        &self,
        Path(id): Path<i64>,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<ProductByIdResponse> {
        let product = sqlx::query!(
            "
                SELECT
                    product.id,
                    product.name,
                    product.description,
                    image_url,
                    price,
                    stock_quantity,
                    created_at,
                    brand.id AS brand_id,
                    brand.name AS brand_name,
                    brand.description AS brand_description,
                    category.id AS category_id,
                    category.name AS category_name,
                    category.description AS category_description
                FROM product
                INNER JOIN brand ON product.brand_id = brand.id
                INNER JOIN category ON product.category_id = category.id
                WHERE product.id = ?
            ",
            id
        )
        .fetch_optional(db)
        .await
        .context("fetch product")?;

        let product = product.map(|product| Product {
            id: product.id,
            name: product.name,
            description: product.description,
            image_url: product.image_url,
            price: product.price,
            stock_quantity: product.stock_quantity,
            created_at: product.created_at,
            brand: Brand {
                id: product.brand_id,
                name: product.brand_name,
                description: product.brand_description,
            },
            category: Category {
                id: product.category_id,
                name: product.category_name,
                description: product.category_description,
            },
        });

        Ok(match product {
            Some(product) => ProductByIdResponse::Found(Json(product)),
            None => ProductByIdResponse::NotFound,
        })
    }

    /// ADMIN
    #[oai(path = "/products", method = "post", operation_id = "createProduct")]
    async fn create_product(
        &self,
        Json(product): Json<ProductBody>,
        AuthToken(user): AuthToken,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<CreateProductResponse> {
        if !user.is_admin(db).await? {
            return Ok(CreateProductResponse::Unauthorized);
        }

        let inserted = sqlx::query!(
            "
                INSERT INTO product (name, description, image_url, price, stock_quantity, brand_id, category_id, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, DATETIME('now'))
                RETURNING id
            ",
            product.name,
            product.description,
            product.image_url,
            product.price,
            product.stock_quantity,
            product.brand_id,
            product.category_id
        )
        .fetch_one(db)
        .await
        .context("create product")?;

        Ok(CreateProductResponse::Created(Json(inserted.id)))
    }

    /// ADMIN
    #[oai(path = "/products/:id", method = "put", operation_id = "updateProduct")]
    async fn update_product(
        &self,
        Path(id): Path<i64>,
        Json(product): Json<ProductBody>,
        AuthToken(user): AuthToken,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<UpdateProductResponse> {
        if !user.is_admin(db).await? {
            return Ok(UpdateProductResponse::Unauthorized);
        }

        let updated = sqlx::query!(
            "
                UPDATE product
                SET
                    name = ?,
                    description = ?,
                    price = ?,
                    stock_quantity = ?,
                    brand_id = ?,
                    category_id = ?
                WHERE id = ?
            ",
            product.name,
            product.description,
            product.price,
            product.stock_quantity,
            product.brand_id,
            product.category_id,
            id
        )
        .execute(db)
        .await
        .context("update product")?;

        if updated.rows_affected() == 0 {
            return Ok(UpdateProductResponse::NotFound);
        }

        Ok(UpdateProductResponse::Updated)
    }

    /// ADMIN
    #[oai(
        path = "/products/:id",
        method = "delete",
        operation_id = "deleteProduct"
    )]
    async fn delete_product(
        &self,
        Path(id): Path<i64>,
        AuthToken(user): AuthToken,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<DeleteProductResponse> {
        if !user.is_admin(db).await? {
            return Ok(DeleteProductResponse::Unauthorized);
        }

        let deleted = sqlx::query!(
            "
                DELETE FROM product
                WHERE id = ?
            ",
            id
        )
        .execute(db)
        .await
        .context("delete product")?;

        if deleted.rows_affected() == 0 {
            return Ok(DeleteProductResponse::NotFound);
        }

        Ok(DeleteProductResponse::Deleted)
    }
}
