             --Exercise 1 : Items and customers     

SELECT * FROM items ORDER BY price ASC;
SELECT * FROM items WHERE price >= 80 ORDER BY DESC;

SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;

                  --Exercise 2 : dvdrental database

SELECT * FROM customer;
SELECT first_name || ' ' || last_name AS full_name 
FROM customer;

SELECT DISTINCT create_date 
FROM customer;

SELECT * FROM customer ORDER BY first_name DESC;

SELECT film_id , title , description , release_year ,rental_rate
FROM film ORDER BY rental_rate ASC ;

SELECT address, phone FROM address WHERE district = 'Texas';

SELECT * FROM film WHERE film_id in(15,150);

SELECT film_id, title, description, length, rental_rate
FROM film WHERE title = 'The Dark Knight';


SELECT film_id, title, description, length, rental_rate
FROM film WHERE title LIKE 'th%';
 
SELECT film_id , title ,rental_rate FROM film ORDER BY rental_rate ASC LIMIT 10; 

SELECT film_id , title ,rental_rate FROM film ORDER BY rental_rate ASC LIMIT 10 OFFSET 10;

SELECT film_id, title, rental_rate FROM film ORDER BY rental_rate ASC
OFFSET 10 ROWS FETCH FIRST 10 ROWS ONLY;

SELECT c.first_name, c.last_name, p.amount, p.payment_date FROM customer c 
INNER JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id ASC ;

SELECT f.film_id , i.film_id FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.film_id IS NULL;

SELECT city.city, country.country FROM city
INNER JOIN country ON city.country_id = country.country_id;


SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
INNER JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id ASC;








