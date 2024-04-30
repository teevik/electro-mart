-- Add migration script here

INSERT INTO `brand` (`name`, `description`)
VALUES
('Apple', 'Apple Inc.'),
('Samsung', 'Samsung Electronics Co., Ltd.'),
('Huawei', 'Huawei Technologies Co., Ltd.'),
('Xiaomi', 'Xiaomi Corporation'),
('OnePlus', 'OnePlus Technology (Shenzhen) Co., Ltd.');

INSERT INTO `category` (`name`, `description`)
VALUES
('Smartphone', 'A mobile phone with advanced features.'),
('Tablet', 'A mobile device with a touch screen display.'),
('Laptop', 'A portable computer.'),
('Desktop', 'A personal computer designed for regular use at a single location.'),
('Smartwatch', 'A wearable computer in the form of a wristwatch.');

INSERT INTO `product` (`name`, `description`, `price`, `stock_quantity`, `created_at`, `brand_id`, `category_id`)
VALUES
('iPhone 12', 'Apple iPhone 12', 799.99, 100, '2021-04-22 09:30:55', 1, 1),
('Galaxy S21', 'Samsung Galaxy S21', 899.99, 100, '2021-04-22 09:30:55', 2, 1),
('MatePad Pro', 'Huawei MatePad Pro', 499.99, 100, '2021-04-22 09:30:55', 3, 2),
('Mi Notebook Pro', 'Xiaomi Mi Notebook Pro', 999.99, 100, '2021-04-22 09:30:55', 4, 3),
('OnePlus 9 Pro', 'OnePlus 9 Pro', 799.99, 100, '2021-04-22 09:30:55', 5, 1),
('iPad Pro', 'Apple iPad Pro', 999.99, 100, '2021-04-22 09:30:55', 1, 2),
('Galaxy Tab S7', 'Samsung Galaxy Tab S7', 699.99, 100, '2021-04-22 09:30:55', 2, 2),
('MateBook X Pro', 'Huawei MateBook X Pro', 1299.99, 100, '2021-04-22 09:30:55', 3, 3),
('Mi Gaming Laptop', 'Xiaomi Mi Gaming Laptop', 1299.99, 100, '2021-04-22 09:30:55', 4, 3),
('OnePlus 9', 'OnePlus 9', 699.99, 100, '2021-04-22 09:30:55', 5, 1),
('MacBook Pro', 'Apple MacBook Pro', 1299.99, 100, '2021-04-22 09:30:55', 1, 3),
('Galaxy Book Flex', 'Samsung Galaxy Book Flex', 1299.99, 100, '2021-04-22 09:30:55', 2, 3),
('MateBook D', 'Huawei MateBook D', 699.99, 100, '2021-04-22 09:30:55', 3, 3),
('Mi Notebook Air', 'Xiaomi Mi Notebook Air', 799.99, 100, '2021-04-22 09:30:55', 4, 3),
('OnePlus 8T', 'OnePlus 8T', 599.99, 100, '2021-04-22 09:30:55', 5, 1),
('iMac', 'Apple iMac', 1299.99, 100, '2021-04-22 09:30:55', 1, 3),
('Galaxy Book S', 'Samsung Galaxy Book S', 999.99, 100, '2021-04-22 09:30:55', 2, 3);
