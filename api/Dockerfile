# Build using cargo-chef, to cache dependencies
FROM rust:1.78-alpine as chef
RUN cargo install cargo-chef

WORKDIR /app


FROM chef AS planner
COPY . .

RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
RUN apk add --no-cache musl-dev

COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --target x86_64-unknown-linux-musl --recipe-path recipe.json
COPY . .
RUN cargo build --bin electro-mart-api --release --target x86_64-unknown-linux-musl

# Runtime
FROM scratch as runtime
WORKDIR /app
COPY --from=builder /app/target/release/electro-mart-api /app/electro-mart-api

EXPOSE 3000
ENTRYPOINT ["/app/electro-mart-api"]
