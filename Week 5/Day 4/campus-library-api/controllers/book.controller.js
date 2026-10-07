import * as BookModel from '../models/book.model.js';

export const getAllBooks = async (req, res) => {
    try {
        const { title, category } = req.query;
        const books = await BookModel.getBooks(title, category);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await BookModel.getBookById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addBook = async (req, res) => {
    try {
        const newBook = await BookModel.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await BookModel.updateBook(req.params.id, req.body);
        if (!updatedBook)

        return res.status(404).json({ error: 'Book not found' });
        res.json(updatedBook);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const deleted = await BookModel.deleteBook(req.params.id);
        if (!deleted) 

        return res.status(400).json({ error: 'Cannot delete book with loan history or not found' });
        res.json({ message: 'Book deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};