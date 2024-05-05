pub mod category;
pub mod error;
pub mod user;

use crate::category::CategoryApi;
use crate::user::UserApi;
use anyhow::Context;
use category::Category;
use poem::Route;
use poem::{listener::TcpListener, EndpointExt};
use poem_openapi::{param::Query, payload::PlainText, OpenApi, OpenApiService};
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool};

#[derive(Debug, sqlx::FromRow)]
struct Brand {
    name: String,
    description: String,
}

#[derive(Debug, sqlx::FromRow)]
struct Product {
    name: String,
    description: String,
    price: f64,
    stock_quantity: i32,
    created_at: String,
}

#[derive(Debug, sqlx::FromRow)]
struct Order {
    id: i32,
    order_date: String,
    total_price: f64,
    // TODO: use enum?
    status: i32,
}

#[derive(Debug, sqlx::FromRow)]
struct OrderItem {
    id: i32,
    quantity: i32,
    price: f64,
}

#[derive(Debug, sqlx::FromRow)]
struct Payment {
    id: i32,
    payment_method: String,
    payment_date: String,
    amount: f64,
    status: i32,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();

    let database_file = "database.sqlite";

    let options = SqliteConnectOptions::new()
        .filename(database_file)
        .create_if_missing(true);

    let db_pool = SqlitePool::connect_with(options)
        .await
        .context("connect to database")?;

    sqlx::migrate!()
        .run(&db_pool)
        .await
        .context("run migrations")?;

    // Start the API service
    let api_service = OpenApiService::new((UserApi, CategoryApi), "Electro Mart API", "1.0")
        .server("http://localhost:3000/api");

    let ui = api_service.swagger_ui();
    let app = Route::new()
        .at("/openapi.json", api_service.spec_endpoint())
        .nest("/api", api_service)
        .nest("/", ui)
        .data(db_pool);

    println!("Listening on http://localhost:3000");

    let listener = TcpListener::bind("0.0.0.0:3000");
    poem::Server::new(listener)
        .run(app)
        .await
        .context("run server")?;

    Ok(())
}
