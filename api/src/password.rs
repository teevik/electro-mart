use anyhow::Context;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, PasswordHash, PasswordVerifier,
};
use tokio::task::spawn_blocking;

pub async fn hash_password(password: String) -> anyhow::Result<String> {
    let hashed_password = spawn_blocking(move || {
        let password_salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let hashed_passowrd = argon2
            .hash_password(password.as_bytes(), &password_salt)
            .map_err(|err| anyhow::anyhow!(err))
            .context("hash password")?
            .to_string();

        Ok(hashed_passowrd)
    });

    hashed_password.await?
}

pub async fn verify_password(password: String, hashed_password: String) -> anyhow::Result<bool> {
    let is_valid = spawn_blocking(move || {
        let hashed_password = PasswordHash::new(&hashed_password)
            .map_err(|err| anyhow::anyhow!(err))
            .context("parse password hash")?;

        let argon2 = Argon2::default();
        let is_valid = argon2
            .verify_password(password.as_bytes(), &hashed_password)
            .is_ok();

        Ok(is_valid)
    });

    is_valid.await?
}
