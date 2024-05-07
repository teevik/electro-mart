FROM rust:1.78

WORKDIR /usr/src/electro-mart-api
COPY . .

RUN cargo install --path .

EXPOSE 3000

CMD ["electro-mart-api"]
