const express =require('express');
const app =express();
const PORT = 5000;

const books = [
  { id: 1, title: ' Hobbit', author: 'Tolkien', publishedYear: 2003 },
  { id: 2, title: '2002', author: 'George Orwell', publishedYear: 2005 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 2000 }
];

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:bookId', (req, res) => {
    const id =parseInt(req,params,id)
    const book = books.find(function(p){
      p.id===id
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);//201 -(ok)
  
});


