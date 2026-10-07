import express from 'express';
import { pool } from '../db/pool.js';
const router = express.Router();

router.get('/books', async (req, res) => {
    try {
        const sql = `
            SELECT 
                b.id, 
                b.title, 
             b.author, 
                COUNT(l.id) AS total_loans
            FROM books b
            LEFT JOIN loans l ON b.id = l.book_id
            GROUP BY b.id, b.title, b.author
            ORDER BY total_loans DESC;
        `;
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/overdue', async (req, res) => {
    try {
        const sql = `
            SELECT 
                l.id AS loan_id,
                m.full_name AS member_name,
             b.title AS book_title,
          l.borrow_date,
                l.due_date
            FROM loans l
            JOIN members m ON l.member_id = m.id
            JOIN books b ON l.book_id = b.id
            WHERE l.return_date IS NULL AND l.due_date < NOW();
        `;
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;