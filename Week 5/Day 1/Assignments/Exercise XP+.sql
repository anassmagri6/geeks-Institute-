CREATE DATABASE bootcamp ;
CREATE TABLE students (
    id SERIAL PRIMARY KEY ,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);

INSERT INTO students (first_name, last_name, birth_date)VALUES 
('Marc', 'Benichou', '1998-11-02'),
 ('Yoan', 'Cohen', '2010-12-03'),
 ('Lea', 'Benichou', '1987-07-27'),
 ('Amelia', 'Dux', '1996-04-07'),
 ('David', 'Grez', '2003-06-14'),
 ('Omer', 'Simpson', '1980-10-03');

INSERT INTO students (first_name, last_name, birth_date)vALUES 
('anas', 'elmagri', '2003-03-01');


SELECT * FROM students;

SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' AND first_name  = 'Marc';

SELECT  last_name, first_name   FROM students WHERE last_name  = 'Benichou' or first_name  = 'Marc';

SELECT first_name FROM students WHERE first_name  ILIKE '%a%';
SELECT first_name FROM students WHERE first_name  ILIKE 'a%';
SELECT first_name FROM students WHERE first_name  ILIKE '%a';
SELECT first_name FROM students WHERE first_name ILIKE '%a_';
SELECT first_name FROM students WHERE id in (1,3);
SELECT * FROM students WHERE birth_date  >= ' 1/01/2000';




















    