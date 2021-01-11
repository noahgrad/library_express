# library_express

This is a project that shows the use of my sql routing and view templates 
in express js
to run the application node index.js
And go to http://localhost:3000

Make sure you run those lines in you mysql workbench:
and make sure to change to the correct db port in index.js
create database BOOKS;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
use books;
CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `books` ADD PRIMARY KEY (`id`);
ALTER TABLE `books` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

