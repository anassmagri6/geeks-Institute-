CREATE DATABASE public;

CREATE TABLE items (
item_id SERIAL PRIMARY KEY,
item_name VARCHAR(255) not NULL,
price inT not NULL
);
CREATE TABLE costomers (
    item_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) not NULL,
    last_name VARCHAR(255) not NULL
);

INSERT INTO items (item_name, price) VALUES
('Small desk',100),
('large desk',300),
('fan',80);


INSERT INTO customers (first_name, last_name) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');


SELECT * FROM items;

SELECT * FROM items WHERE price > 80;
SELECT * FROM items WHERE price < 300;  

SELECT * FROM customers WHERE last_name = 'Smith';
SELECT * FROM customers WHERE first_name = 'John';

SELECT * FROM costomers WHERE first_name !='Scott'

