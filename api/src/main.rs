mod brand;
mod category;
mod error;
mod order;
mod product;
mod swagger_ui;
mod user;

use crate::brand::BrandApi;
use crate::category::CategoryApi;
use crate::order::OrderApi;
use crate::product::ProductApi;
use crate::user::UserApi;
use anyhow::Context;
use hmac::digest::KeyInit;
use hmac::Hmac;
use poem::Route;
use poem::{listener::TcpListener, EndpointExt};
use poem_openapi::{OpenApiService, Tags};
use sha2::Sha256;
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool};
use std::env;

pub type ServerKey = Hmac<Sha256>;

#[derive(Tags)]
pub enum ApiTags {
    User,
    Category,
    Brand,
    Product,
    Order,
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

    let server_key = env::var("SERVER_KEY").context("SERVER_KEY env must be set")?;
    let server_key = ServerKey::new_from_slice(server_key.as_bytes()).context("make server key")?;

    // Start the API service
    let api_service = OpenApiService::new(
        (UserApi, CategoryApi, BrandApi, ProductApi, OrderApi),
        "Electro Mart API",
        "1.0",
    )
    .server("/api");

    let ui = swagger_ui::create_endpoint(&api_service.spec());

    let app = Route::new()
        .at("/openapi.json", api_service.spec_endpoint())
        .nest("/api", api_service)
        .nest("/", ui)
        .data(db_pool)
        .data(server_key);

    println!("Listening on http://localhost:3000");

    let listener = TcpListener::bind("0.0.0.0:3000");
    poem::Server::new(listener)
        .run(app)
        .await
        .context("run server")?;

    Ok(())
}
