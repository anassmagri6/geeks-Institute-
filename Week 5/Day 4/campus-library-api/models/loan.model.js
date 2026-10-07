import { pool } from '../db/pool.js';

export async function borrowBook(memberId, bookId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const bookRes = await client.query(
      'SELECT available_copies FROM books WHERE id = $1 FOR UPDATE',
      [bookId]
    );
    if (bookRes.rows.length === 0 || bookRes.rows[0].available_copies <= 0) {
      throw new Error('The book is not available for borrowing');
    }
    await client.query(
      'UPDATE books SET available_copies = available_copies - 1 WHERE id = $1',
      [bookId]
    );
    const sql = `
      INSERT INTO loans (member_id, book_id, borrow_date, due_date)
      VALUES ($1, $2, NOW(), NOW() + INTERVAL '14 days')
      RETURNING id, member_id, book_id, borrow_date, due_date
    `;
    const result = await client.query(sql, [memberId, bookId]);

    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}


export async function returnBook(loanId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const loanRes = await client.query(
      'SELECT book_id, return_date FROM loans WHERE id = $1 FOR UPDATE',
      [loanId]
    );
    if (loanRes.rows.length === 0 || loanRes.rows[0].return_date !== null) {
      throw new Error('THE loan record is invalid or the book has already been returned');
    }
    const sql = `
      UPDATE loans
      SET return_date = NOW()
      WHERE id = $1
      RETURNING id, member_id, book_id, borrow_date, due_date, return_date
    `;
    const result = await client.query(sql, [loanId]);
    await client.query(
      'UPDATE books SET available_copies = available_copies + 1 WHERE id = $1',
      [loanRes.rows[0].book_id]
    );
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}