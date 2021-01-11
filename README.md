# library_express

This is a project that shows the use of my sql routing and view templates 
in express js
<br>
to run the application node index.js <br>
And go to http://localhost:3000

Make sure you run those lines in you mysql workbench: <br>
and make sure to change to the correct db port in index.js <br>
create database BOOKS; <br>
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; <br>
use books; <br>
CREATE TABLE `books` ( <br>
  `id` int(11) NOT NULL, <br>
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL, <br>
  `author` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL, <br>
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, <br>
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP <br>
)  <br>

ALTER TABLE `books` ADD PRIMARY KEY (`id`); <br>
ALTER TABLE `books` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; <br>

