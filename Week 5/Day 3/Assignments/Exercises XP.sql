                            ---🌟 Exercise 1: DVD Rental
SELECT * FROM public.language;

SELECT film.title ,film.description,language.name AS s FROM film 
INNER JOIN language ON film.language_id=language.language_id;

SELECT film.title ,film.description,language.name as s FROM film 
RIGHT JOIN language ON film.language_id=language.language_id;

DROP TABLE IF EXISTS new_film CASCADE;

CREATE TABLE  new_film (
    id SERIAL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL 
);

INSERT INTO new_film (name)
 VALUES('saw'),
 ('The Godfather');

DROP TABLE IF EXISTS customer_review CASCADE;

CREATE TABLE  customer_review(
review_id SERIAL PRIMARY KEY ,
film_id INT REFERENCES new_film(id) ON DELETE CASCADE ,
language_id INT REFERENCES language(language_id),
title VARCHAR(255) NOT NULL ,
score INT CHECK (score BETWEEN 1 AND 10),
review_text TEXT,
last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Saw', 8, 'I loved this movie'),
(2, 1, 'The Godfather', 9, 'I really enjoyed this movie');

DELETE FROM new_film WHERE id = 1;
SELECT * FROM customer_review;

                         --🌟 Exercise 2 : DVD Rental
UPDATE film
SET language_id = 2
WHERE film_id IN (1, 2, 3);

DROP TABLE customer_review;

SELECT COUNT(*) AS x FROM rental WHERE return_date IS NULL;

SELECT film.title,film.replacement_price,film.rental_rate,rental.rental_date FROM rental JOIN inventory
ON rental.inventory_id = inventory.inventory_id 
JOIN film ON inventory.film_id = film.film_id
WHERE rental.return_date IS NULL ORDER BY film.replacement_price DESC LIMIT 30;

SELECT film.title, film.description  FROM film JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id WHERE actor.first_name = 'Penelope' 
AND actor.last_name = 'Monroe'AND film.description ILIKE '%sumo wrestler%';














    