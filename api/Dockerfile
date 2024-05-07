FROM rust:1.78

WORKDIR /usr/src/electro-mart-api
COPY . .

RUN cargo install --path .

CMD ["electro-mart-api"]
