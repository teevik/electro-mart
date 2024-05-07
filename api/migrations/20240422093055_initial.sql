-- litesql database

CREATE TABLE `brand` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `name` TEXT NOT NULL,
    `description` TEXT
);

CREATE TABLE `category` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `name` TEXT NOT NULL,
    `description` TEXT
);

CREATE TABLE `user` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `email` TEXT NOT NULL UNIQUE,
    `hashed_password` TEXT NOT NULL,
    `is_admin` INTEGER NOT NULL DEFAULT false,
    `first_name` TEXT NOT NULL,
    `last_name` TEXT NOT NULL,
    `street` TEXT NOT NULL,
    `postal_code` TEXT NOT NULL,
    `city` TEXT NOT NULL
);

CREATE TABLE `product` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `name` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `price` REAL NOT NULL,
    `stock_quantity` INTEGER NOT NULL,
    `created_at` DATETIME NOT NULL,
    `brand_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    FOREIGN KEY (`brand_id`) REFERENCES `brand`(`id`) ON DELETE RESTRICT,
    FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT
);

CREATE TABLE `order` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `order_date` DATETIME NOT NULL,
    `total_price` REAL NOT NULL,
    `status` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

CREATE TABLE `order_item` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE
);

CREATE TABLE `payment` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    `payment_method` TEXT NOT NULL,
    `payment_date` DATETIME NOT NULL,
    `status` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE
);
