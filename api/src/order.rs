use crate::{error::ServerResult, ApiTags};
use anyhow::Context;
use chrono::NaiveDateTime;
use poem::web::Data;
use poem_openapi::{payload::Json, ApiResponse, Enum, Object, OpenApi};
use sqlx::SqlitePool;

#[derive(Debug, Enum, sqlx::Type)]
enum PaymentStatus {
    Pending = 0,
    Paid = 1,
    Failed = 2,
}

impl From<i64> for PaymentStatus {
    fn from(value: i64) -> Self {
        match value {
            0 => PaymentStatus::Pending,
            1 => PaymentStatus::Paid,
            2 => PaymentStatus::Failed,
            _ => panic!("invalid payment status"),
        }
    }
}

#[derive(Debug, Object)]
struct Payment {
    pub payment_method: String,
    pub payment_date: NaiveDateTime,
    pub amount: f64,
    pub status: PaymentStatus,
}

#[derive(Debug, Object)]
struct OrderItem {
    pub quantity: i64,
    pub product_id: i64,
}

#[derive(Debug, Enum, sqlx::Type)]
pub enum OrderStatus {
    Pending = 0,
    Paid = 1,
    Shipped = 2,
    Delivered = 3,
    Cancelled = 4,
}

impl From<i64> for OrderStatus {
    fn from(value: i64) -> Self {
        match value {
            0 => OrderStatus::Pending,
            1 => OrderStatus::Paid,
            2 => OrderStatus::Shipped,
            3 => OrderStatus::Delivered,
            4 => OrderStatus::Cancelled,
            _ => panic!("invalid order status"),
        }
    }
}

#[derive(Debug, Object)]
struct Order {
    pub id: i64,
    pub order_date: NaiveDateTime,
    pub total_price: f64,
    pub status: OrderStatus,
}

#[derive(ApiResponse)]
enum CreateOrderResponse {
    #[oai(status = 201)]
    Created(Json<i64>)
}

pub struct OrderApi;

#[OpenApi(tag = ApiTags::Order)]
impl OrderApi {
    #[oai(path = "/orders", method = "get")]
    async fn all_orders(&self, Data(db): Data<&SqlitePool>) -> ServerResult<Json<Vec<Order>>> {
        let orders = sqlx::query_as!(
            Order,
            "
                SELECT
                    id,
                    order_date,
                    total_price,
                    status
                FROM `order`
            "
        )
        .fetch_all(db)
        .await
        .context("fetch orders")?;

        Ok(Json(orders))
    }

    #[oai(path = "/orders", method = "post")]
    async fn create_order(&self, Data(db): Data<&SqlitePool>) -> ServerResult<CreateOrderResponse> {
}
