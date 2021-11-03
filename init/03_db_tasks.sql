GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'%' IDENTIFIED BY 'test';
USE mydatabase;
SELECT DATABASE();

CREATE TABLE products(name VARCHAR(100));
INSERT INTO products VALUES ('portatil'), ('teclado'), ('raton');
