use crate::{auth::AuthToken, error::ServerResult, ApiTags};
use anyhow::Context;
use chrono::NaiveDateTime;
use poem::web::Data;
use poem_openapi::{param::Path, payload::Json, ApiResponse, Enum, Object, OpenApi};
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
    pub status: PaymentStatus,
}

#[derive(Debug, Object)]
struct OrderItem {
    // >= 1
    #[oai(validator(minimum(value = "1", exclusive = "false")))]
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

#[derive(Debug, Object)]
struct SpecificOrder {
    pub id: i64,
    pub order_date: NaiveDateTime,
    pub total_price: f64,
    pub status: OrderStatus,

    pub items: Vec<OrderItem>,
    pub payment: Option<Payment>,
}

#[derive(ApiResponse)]
enum OrderByIdResponse {
    #[oai(status = 200)]
    Found(Json<SpecificOrder>),

    #[oai(status = 404)]
    NotFound,
}

#[derive(Debug, Object)]
struct OrderBody {
    pub items: Vec<OrderItem>,
}

#[derive(ApiResponse)]
enum CreateOrderResponse {
    /// Created order, returns the order id
    #[oai(status = 201)]
    Created(Json<i64>),
}

#[derive(Debug, Object)]
struct PaymentBody {
    #[oai(validator(min_length = 1, max_length = 255))]
    pub payment_method: String,
}

#[derive(ApiResponse)]
enum PayResponse {
    /// Payment successful
    #[oai(status = 201)]
    Paid,

    /// Payment failed, the order is already paid for
    #[oai(status = 400)]
    PaymentAlreadyDone,

    /// Order not found
    #[oai(status = 404)]
    NotFound,
}

#[derive(ApiResponse)]
enum DeleteOrderResponse {
    /// The order has been successfully deleted
    #[oai(status = 204)]
    Deleted,

    /// The user is not authorized to delete a order
    #[oai(status = 401)]
    Unauthorized,

    /// The order with the given ID does not exist
    #[oai(status = 404)]
    NotFound,
}

pub struct OrderApi;

#[OpenApi(tag = ApiTags::Order)]
impl OrderApi {
    #[oai(path = "/orders", method = "get", operation_id = "allOrders")]
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

    #[oai(path = "/orders/:id", method = "get", operation_id = "getOrder")]
    async fn get_order(
        &self,
        Path(id): Path<i64>,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<OrderByIdResponse> {
        let row = sqlx::query!(
            "
                SELECT
                    `order`.id,
                    order_date,
                    total_price,
                    `order`.status,
                    payment.payment_method,
                    payment.payment_date,
                    payment.status AS payment_status
                FROM `order`
                LEFT OUTER JOIN payment ON `order`.id = payment.order_id
                WHERE `order`.id = ?
            ",
            id
        )
        .fetch_optional(db)
        .await
        .context("fetch order")?;

        let Some(row) = row else {
            return Ok(OrderByIdResponse::NotFound);
        };

        let items = sqlx::query_as!(
            OrderItem,
            "
                SELECT
                    quantity,
                    product_id
                FROM order_item
                WHERE order_id = ?
            ",
            id
        )
        .fetch_all(db)
        .await
        .context("fetch order items")?;

        let payment = row.payment_method.map(|payment_method| Payment {
            payment_method,
            payment_date: row.payment_date.expect("exists"),
            status: row.payment_status.expect("exists").into(),
        });

        let order = SpecificOrder {
            id: row.id,
            order_date: row.order_date,
            total_price: row.total_price,
            status: row.status.into(),
            items,
            payment,
        };

        Ok(OrderByIdResponse::Found(Json(order)))
    }

    #[oai(path = "/orders", method = "post", operation_id = "createOrder")]
    async fn create_order(
        &self,
        Json(order): Json<OrderBody>,
        AuthToken(user): AuthToken,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<CreateOrderResponse> {
        let status = OrderStatus::Pending;

        let mut total_price: f64 = 0.;

        for item in &order.items {
            let product = sqlx::query!(
                "
                    SELECT price
                    FROM product
                    WHERE id = ?
                ",
                item.product_id
            )
            .fetch_one(db)
            .await
            .context("fetch product")?;

            total_price += product.price * item.quantity as f64;
        }

        let inserted_order = sqlx::query!(
            "
                INSERT INTO `order` (order_date, total_price, status, user_id)
                VALUES (DATETIME('now'), ?, ?, ?)
                RETURNING id
            ",
            total_price,
            status,
            user.id
        )
        .fetch_one(db)
        .await
        .context("insert order")?;

        let order_id = inserted_order.id;

        for item in &order.items {
            sqlx::query!(
                "
                    INSERT INTO order_item (quantity, order_id, product_id)
                    VALUES (?, ?, ?)
                ",
                item.quantity,
                order_id,
                item.product_id
            )
            .execute(db)
            .await
            .context("insert order item")?;
        }

        Ok(CreateOrderResponse::Created(Json(order_id)))
    }

    #[oai(path = "/orders/:id/pay", method = "post", operation_id = "payOrder")]
    async fn pay_order(
        &self,
        Path(id): Path<i64>,
        Json(payment): Json<PaymentBody>,
        AuthToken(user): AuthToken,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<PayResponse> {
        let order_id = id;

        let order = sqlx::query!(
            "
                SELECT
                    `order`.status,
                    payment.status AS payment_status
                FROM `order`
                LEFT JOIN payment ON `order`.id = payment.order_id
                WHERE `order`.id = ? AND `order`.user_id = ?
            ",
            order_id,
            user.id
        )
        .fetch_optional(db)
        .await
        .context("fetch order")?;

        let Some(order) = order else {
            return Ok(PayResponse::NotFound);
        };

        if order.payment_status.is_some() {
            return Ok(PayResponse::PaymentAlreadyDone);
        }

        sqlx::query!(
            "
                INSERT INTO payment (order_id, payment_method, status, payment_date)
                VALUES (?, ?, ?, DATETIME('now'))
            ",
            order_id,
            payment.payment_method,
            PaymentStatus::Pending
        )
        .execute(db)
        .await
        .context("insert payment")?;

        Ok(PayResponse::Paid)
    }

    /// ADMIN
    #[oai(path = "/orders/:id", method = "delete", operation_id = "deleteOrder")]
    async fn delete_order(
        &self,
        Path(id): Path<i64>,
        AuthToken(user): AuthToken,
        Data(db): Data<&SqlitePool>,
    ) -> ServerResult<DeleteOrderResponse> {
        if !user.is_admin(db).await? {
            return Ok(DeleteOrderResponse::Unauthorized);
        }

        let result = sqlx::query!(
            "
                DELETE FROM `order`
                WHERE id = ?
            ",
            id
        )
        .execute(db)
        .await
        .context("delete order")?;

        if result.rows_affected() == 0 {
            Ok(DeleteOrderResponse::NotFound)
        } else {
            Ok(DeleteOrderResponse::Deleted)
        }
    }
}
