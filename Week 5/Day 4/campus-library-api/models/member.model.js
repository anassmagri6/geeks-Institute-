import { pool } from '../db/pool.js';

export async function addMember(full_name, email) {
  const sql = `
    INSERT INTO members (full_name, email, joining_date)
    VALUES ($1, $2, NOW())
    RETURNING id, full_name, email, joining_date
  `;
  const result = await pool.query(sql, [full_name, email]);  
  return result.rows[0]; 
}
export async function findMemberById(id) {
  const sql = `
    SELECT id, full_name, email, joining_date
    FROM members
    WHERE id = $1
  `;
  const result = await pool.query(sql, [id]);  
  return result.rows[0] ?? null; 
}
export async function getMemberLoans(memberId) {
  const sql = `
    SELECT l.id AS loan_id, b.title AS book_title, l.borrow_date, l.due_date, l.return_date
    FROM loans l
    JOIN books b ON l.book_id = b.id
    WHERE l.member_id = $1
    ORDER BY l.borrow_date DESC
  `;
  const result = await pool.query(sql, [memberId]);
  return result.rows;
}

export async function updateMember(id, full_name, email) {
  const sql = `
    UPDATE members
    SET full_name = COALESCE($2, full_name),
        email = COALESCE($3, email)
    WHERE id = $1
    RETURNING id, full_name, email, joining_date
  `;
  const result = await pool.query(sql, [id, full_name, email]);  
  return result.rows[0] ?? null; 
}

export async function deleteMember(id) {
  const sql = `
    DELETE FROM members
    WHERE id = $1
    RETURNING id
  `;
  const result = await pool.query(sql, [id]);  
  return result.rows[0] ?? null; 
}