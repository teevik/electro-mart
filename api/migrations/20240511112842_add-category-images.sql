-- Add migration script here

ALTER TABLE `category` 
ADD COLUMN `image_url` VARCHAR(255) NOT NULL DEFAULT 'https://cdn.discordapp.com/attachments/1238464725482868886/1238532984576147576/oneplus-9-pro-5g-smarttelefon-8128gb-stellar-black--pdp_zoom-3000.png?ex=663fa13a&is=663e4fba&hm=512be7f1515464deda65d55d954fa5a2a6a1ea7da17b6cd0a4a357c29fb5e18c&';

UPDATE `category`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238532984576147576/oneplus-9-pro-5g-smarttelefon-8128gb-stellar-black--pdp_zoom-3000.png?ex=663fa13a&is=663e4fba&hm=512be7f1515464deda65d55d954fa5a2a6a1ea7da17b6cd0a4a357c29fb5e18c&'
WHERE `name` = 'Smartphone';

UPDATE `category`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533059763114124/ipad-pro-11-2022-128-gb-wifi-5g-stellargra--pdp_zoom-3000.png?ex=663fa14c&is=663e4fcc&hm=1e258d2177d0e9d67ad3458442f11b2259187a6a6ad322c9da2074884731d8fc&'
WHERE `name` = 'Tablet';

UPDATE `category`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238533201899819089/huawei-matebook-x-pro-2020-barbar-pc-gra--pdp_zoom-3000.png?ex=663fa16e&is=663e4fee&hm=51e2b1d01ca55a64852511441a15b9ece005ed5a117b89340e2147d708f566db&'
WHERE `name` = 'Laptop';

UPDATE `category`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238535683971350558/imac-24-m3-2023-810512-solv--pdp_zoom-3000.png?ex=663fa3bd&is=663e523d&hm=00bc92b20994fe4cac416a80826cb727922d20dde14a31f7caaf85a1eafacbd9&'
WHERE `name` = 'Desktop';

UPDATE `category`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238817632262553703/SN-SMART001_VrIkJOnBm1phWLL0KZUMM.png?ex=6640aa53&is=663f58d3&hm=31bcc1ee6452fd81c5ce3b38f0f7c1e62b89711a4b5822e58e0eeb71c2115e58&'
WHERE `name` = 'Smartwatch';

