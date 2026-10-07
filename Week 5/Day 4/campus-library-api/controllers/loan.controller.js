import * as LoanModel from '../models/loan.model.js';

export const borrowBook = async (req, res) => {
  try {
    const { member_id, book_id, due_date } = req.body;
    const loan = await LoanModel.borrowBook(member_id, book_id, due_date);
    res.status(201).json(loan);
    
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('available')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const loan = await LoanModel.returnBook(req.params.id);
    res.json(loan);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('already returned')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};