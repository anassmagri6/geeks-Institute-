const express = require('express');
const router = express.Router();
const books = [];

router.get('/', (req, res) => {
    res.json(books);

});

router.post('/', (req, res) => {
    const {title, author} = req.body;
    const newBook = {
        id : books.length + 1,
        title,
        author, }
    books.push(newBook);
    res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
const { id } = req.params;
const { title, author } = req.body;
const book = books.find(p => p.id === parseInt(id));
    
if (!book) {
 return res.status(404).json({ message: 'Book not found' });
 }
    
book.title = title || book.title;
book.author = author || book.author;
    
res.json(book);
});


router.delete('/:id', (req, res) => { 
const { id } = req.params; 
const index = books.findIndex(k => k.id === parseInt(id)); 
    
if (index === -1) { 
    return res.status(404).send({ message: 'Book not found' }); 
    } 
books.splice(index, 1); 
res.send({ message: 'Book deleted' }); 
});
module.exports = router; 





