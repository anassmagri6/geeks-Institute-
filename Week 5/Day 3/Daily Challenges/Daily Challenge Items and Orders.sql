
CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INT UNIQUE REFERENCES Customer(id) ON DELETE CASCADE
);

INSERT INTO Customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO Customer_profile (isLoggedIn, customer_id)
VALUES 
(true, (SELECT id FROM Customer WHERE first_name = 'John' AND last_name = 'Doe')),
(false, (SELECT id FROM Customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

SELECT c.first_name 
FROM Customer c
JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = true;

SELECT c.first_name, COALESCE(cp.isLoggedIn, false) AS isLoggedIn
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id;

SELECT COUNT(*) SELECT COUNT(*) 
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = false OR cp.isLoggedIn IS NULL;


CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

INSERT INTO Book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

INSERT INTO Student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

CREATE TABLE Library (
    book_fk_id INT REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_id INT REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_id)
);

INSERT INTO Library (student_id, book_fk_id, borrowed_date)
VALUES 
((SELECT student_id FROM Student WHERE name = 'John'), (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'), '2022-02-15'),
((SELECT student_id FROM Student WHERE name = 'Bob'), (SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'), '2021-03-03'),
((SELECT student_id FROM Student WHERE name = 'Lera'), (SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'), '2021-05-23'),
((SELECT student_id FROM Student WHERE name = 'Bob'), (SELECT book_id FROM Book WHERE title = 'Harry Potter'), '2021-08-12');

SELECT * FROM Library;

SELECT s.name, b.title
FROM Library l
JOIN Student s ON l.student_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;

SELECT AVG(s.age) AS average_age
FROM Library l
JOIN Student s ON l.student_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

DELETE FROM Student WHERE name = 'John';
