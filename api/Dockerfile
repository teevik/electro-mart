# Builder
FROM rust:1.78-alpine as builder
WORKDIR /app
COPY . /app/
RUN apk add --no-cache musl-dev
RUN cargo build --bin electro-mart-api --release

# Runtime
FROM scratch as runtime
WORKDIR /app
COPY --from=builder /app/target/release/electro-mart-api /app/electro-mart-api

EXPOSE 3000
ENTRYPOINT ["/app/electro-mart-api"]
