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

INSERT INTO `product` (`name`, `description`, `price`, `stock_quantity`, `created_at`, `brand_id`, `category_id`, `image_url`)
VALUES
('iPhone 12', 'Apple iPhone 12', 799.99, 100, '2021-04-22 09:30:55', 1, 1, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238464835944054814/1184627.png?ex=663f61c2&is=663e1042&hm=dfff41ef743953994c982f20fd739f86065aab53485ba36ec724f52fac2d52bb&'),
('Galaxy S21', 'Samsung Galaxy S21', 899.99, 100, '2021-04-22 09:30:55', 2, 1, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238466346560389200/samsung-galaxy-s21-5g-8128gb-phantom-gray--pdp_main-1920.png?ex=663f632a&is=663e11aa&hm=0b77aed0d10708495162e5faf18b9bc2cf35651a18064dde2acd86599fdbb0c1&'),
('MatePad Pro', 'Huawei MatePad Pro', 499.99, 100, '2021-04-22 09:30:55', 3, 2, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238532779382411336/huawei-matepad-pro-wifi-128-gb-nettbrett--pdp_zoom-3000.png?ex=663fa109&is=663e4f89&hm=f1a9839b82cd4924f1548197417f51d2d9663c71a9eade721915f844d0771404&'),
('Mi Notebook Pro', 'Xiaomi Mi Notebook Pro', 999.99, 100, '2021-04-22 09:30:55', 4, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238532944025489490/Xiaomi-Mi-Notebook-Pro-Enhanced-Edition-i5-10210U-8GB-1TB-Gray-906821-.png?ex=663fa130&is=663e4fb0&hm=512319fcafbca8eb9258b1e5311d44ff8883b88d8c68ffd70bb75c0244203290&'),
('OnePlus 9 Pro', 'OnePlus 9 Pro', 799.99, 100, '2021-04-22 09:30:55', 5, 1, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238532984576147576/oneplus-9-pro-5g-smarttelefon-8128gb-stellar-black--pdp_zoom-3000.png?ex=663fa13a&is=663e4fba&hm=512be7f1515464deda65d55d954fa5a2a6a1ea7da17b6cd0a4a357c29fb5e18c&'),
('iPad Pro', 'Apple iPad Pro', 999.99, 100, '2021-04-22 09:30:55', 1, 2, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533059763114124/ipad-pro-11-2022-128-gb-wifi-5g-stellargra--pdp_zoom-3000.png?ex=663fa14c&is=663e4fcc&hm=1e258d2177d0e9d67ad3458442f11b2259187a6a6ad322c9da2074884731d8fc&'),
('Galaxy Tab S7', 'Samsung Galaxy Tab S7', 699.99, 100, '2021-04-22 09:30:55', 2, 2, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533117233598524/samsung-galaxy-tab-s7-wifi-nettbrett-sort--pdp_zoom-3000.png?ex=663fa159&is=663e4fd9&hm=ff8f0098795600bb5cc98c41470e8414bde643f1562c0975fdb56d8595f1f0aa&'),
('MateBook X Pro', 'Huawei MateBook X Pro', 1299.99, 100, '2021-04-22 09:30:55', 3, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533201899819089/huawei-matebook-x-pro-2020-barbar-pc-gra--pdp_zoom-3000.png?ex=663fa16e&is=663e4fee&hm=51e2b1d01ca55a64852511441a15b9ece005ed5a117b89340e2147d708f566db&'),
('Mi Gaming Laptop', 'Xiaomi Mi Gaming Laptop', 1299.99, 100, '2021-04-22 09:30:55', 4, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533918743859362/xiaomi-mi-gaming-laptop-intel-core-i7-7700hq-16gb-256gb-1tb-deep-gray-1574132647435.png?ex=663fa219&is=663e5099&hm=228d2956c7ecbcfa89f7f3a50842051434ce5f5293aa07400772322ef7ee3df5&'),
('OnePlus 9', 'OnePlus 9', 699.99, 100, '2021-04-22 09:30:55', 5, 1, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533666200621076/oneplus-9-5g-smarttelefon-8128gb-astral-black--pdp_zoom-3000.png?ex=663fa1dc&is=663e505c&hm=c5da128c0d75507e87630ad6fd2a17210d9c54617cd42c6fe3c5dd5a47bc39ea&'),
('MacBook Pro', 'Apple MacBook Pro', 1299.99, 100, '2021-04-22 09:30:55', 1, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533981830385844/macbook-pro-14-m3-max-2023-361tb-solv--pdp_zoom-3000.png?ex=663fa228&is=663e50a8&hm=eb407f6862e96056e00817e9a21f2adaa19bb5cf655069288ac66debb7e65950&'),
('Galaxy Book Flex', 'Samsung Galaxy Book Flex', 1299.99, 100, '2021-04-22 09:30:55', 2, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238534117814177862/no-galaxy-book-flex-np930-np930qcg-k01se-fronttransparent-320412158.png?ex=663fa248&is=663e50c8&hm=40a949ef49c3ba916b4af24d9eb1a13d37fbdf05479286d084dbe296533e3e84&'),
('MateBook D', 'Huawei MateBook D', 699.99, 100, '2021-04-22 09:30:55', 3, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238534175972397067/huawei-matebook-d-14-barbar-pc--pdp_zoom-3000.png?ex=663fa256&is=663e50d6&hm=080ba664996c345b766d7f86bff77e1f00481f335cbb62d074852abf5c15773d&'),
('Mi Notebook Air', 'Xiaomi Mi Notebook Air', 799.99, 100, '2021-04-22 09:30:55', 4, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238534379244884010/xiaomi-book-air-13-2022-cover-1.png?ex=663fa286&is=663e5106&hm=d05cd6422415543e8e1f103617d0c9ad05f44da5b18ac3a45ef8c3c7c961821d&'),
('OnePlus 8T', 'OnePlus 8T', 599.99, 100, '2021-04-22 09:30:55', 5, 1, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238534489387434045/oneplus-8t-5g-smarttelefon-8128gb-luna-silver--pdp_zoom-3000.png?ex=663fa2a1&is=663e5121&hm=7324d910cebeac00a3399149806e28e5dd2ec018c72714ccd5add205a514e127&'),
('iMac', 'Apple iMac', 1299.99, 100, '2021-04-22 09:30:55', 1, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238535683971350558/imac-24-m3-2023-810512-solv--pdp_zoom-3000.png?ex=663fa3bd&is=663e523d&hm=00bc92b20994fe4cac416a80826cb727922d20dde14a31f7caaf85a1eafacbd9&'),
('Galaxy Book S', 'Samsung Galaxy Book S', 999.99, 100, '2021-04-22 09:30:55', 2, 3, 'https://cdn.discordapp.com/attachments/1238464725482868886/1238534578755338301/samsung-galaxy-book-s-13-barbar-pc-mercury-gray--pdp_zoom-3000.png?ex=663fa2b6&is=663e5136&hm=2d5101c7856ec78ebfbe9478d6d52c9a186dd099589d34ebfd1ba8165ba37668&');
