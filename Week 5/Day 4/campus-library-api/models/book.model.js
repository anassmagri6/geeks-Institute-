import {pool} from '../db/pool.js';

export async function findAllBooks(title=NULL,category=NULL){
    const sql=`
    SELECT id, title, author, category, total_copies,available_copies
    FROM books
    WHERE($1::text IS NULL OR title ILIKE '%' || $1 || '%')
    AND ($2::text IS NULL OR category ILIKE '%' || $2 || '%')
    ORDER BY id`;
    const result=await pool.query(sql,[title,category]);   
    return result.rows;     
}

export async function findBookById(id){
    const sql=`
    SELECT id, title, author, category, total_copies, available_copies
    FROM books
    WHERE id=$1`;
    const result=await pool.query(sql,[id]);  
    return result.rows[0]; 
}

export async function addBook(title, author, category,total_copies,available_copies){
    const sql=`
    INSERT INTO books(title, author, category, total_copies, available_copies)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, title, author, category, total_copies, available_copies`;
    const result=await pool.query(sql,[title, author, category, total_copies, available_copies]);  
    return result.rows[0]; 
}
export async function updateBook(id, title, author, category){
    const sql=`
    UPDATE books
    SET title=$2, author=$3, category=$4
    WHERE id=$1
    RETURNING id, title, author, category, total_copies, available_copies`;
    const result=await pool.query(sql,[id, title, author, category]);  
    return result.rows[0]; 
}
export async function deleteBook(id){
    const sql=`
    DELETE FROM books
    WHERE id=$1
    RETURNING id, title, author, category, total_copies, available_copies`;
    const result=await pool.query(sql,[id]);  
    return result.rows[0]; 
; 
}