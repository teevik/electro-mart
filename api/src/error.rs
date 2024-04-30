use poem_openapi::{payload::PlainText, ApiResponse};

#[derive(Debug, ApiResponse)]
pub enum ServerError {
    #[oai(status = "500")]
    InternalServerError(PlainText<String>),
}

impl From<anyhow::Error> for ServerError {
    fn from(err: anyhow::Error) -> Self {
        tracing::error!("Internal server error: {:?}", err);

        ServerError::InternalServerError(PlainText("Internal server error".to_string()))
    }
}

pub type ServerResult<T> = Result<T, ServerError>;
