-- Add migration script here

ALTER TABLE `brand` 
ADD COLUMN `image_url` VARCHAR(255) NOT NULL DEFAULT 'https://cdn.discordapp.com/attachments/1238464725482868886/1238819794732711987/image-58-1024x512.png?ex=6640ac57&is=663f5ad7&hm=354e26f7973a4cffafdd7d0df47d41313ded469697a378effb74aafc35745fd5&';

UPDATE `brand`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238819794732711987/image-58-1024x512.png?ex=6640ac57&is=663f5ad7&hm=354e26f7973a4cffafdd7d0df47d41313ded469697a378effb74aafc35745fd5&'
WHERE `name` = 'Apple';

UPDATE `brand`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238819904006918154/Samsung-Logo-2005-present-1024x576.png?ex=6640ac71&is=663f5af1&hm=7696dae89f317d26516bb9f90db69d5185fe47a11258f8e29e02aa3ddf0cbca1&'
WHERE `name` = 'Samsung';

UPDATE `brand`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238819954695078000/1200px-Huawei_Standard_logo.png?ex=6640ac7d&is=663f5afd&hm=b5127650a9d7ed72add949fbf7c3ca82a5102c234f071dd795fce9dad6a5e641&'
WHERE `name` = 'Huawei';

UPDATE `brand`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238820021048840213/1200px-Xiaomi_logo_282021-29.png?ex=6640ac8d&is=663f5b0d&hm=f7d12c77adb4ddff9c436f52d2d5386d12b775ecb62f613f43e5275f90f9db11&'
WHERE `name` = 'Xiaomi';

UPDATE `brand`
SET `image_url` = 'https://cdn.discordapp.com/attachments/1238464725482868886/1238820089248350249/OnePlus-Logo.png?ex=6640ac9d&is=663f5b1d&hm=4297a1217b09c2bd0172911c83e978351ae24797e966c0d48b5c3c6ffd4cc58b&'
WHERE `name` = 'OnePlus';