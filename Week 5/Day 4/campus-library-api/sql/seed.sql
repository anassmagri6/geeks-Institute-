INSERT INTO books (title, author, category, total_copies, available_copies) VALUES
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 3, 2),
('1984', 'George Orwell', 'Dystopian', 2, 0),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 4, 3),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 2, 2),
('Pride and Prejudice', 'Jane Austen', 'Romance', 3, 2);

INSERT INTO members (full_name, email, joined_date) VALUES
('John Doe', 'john.doe@example.com', '2020-01-01'),
('Jane Smith', 'jane.smith@example.com', '2021-05-15'),
('Alice Johnson', 'alice.johnson@example.com', '2022-09-01');

INSERT INTO loans (book_id, member_id, borrow_date, due_date, return_date) VALUES
(1, 1, '2023-01-10', '2023-01-24', '2023-01-20'),
(2, 2, '2023-02-15', '2023-03-01', '2023-02-25'),
(3, 1, '2023-03-05', '2023-03-19', NULL),
(4, 3, '2023-04-12', '2023-04-26', '2023-04-22'),
(5, 2, '2023-05-01', '2023-05-15', NULL);