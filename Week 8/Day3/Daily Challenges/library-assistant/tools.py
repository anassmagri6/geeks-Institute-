import json
import os

def  load_books():
    if not os.path.exists('books.json'):
        raise FileNotFoundError("books.json not found")
    with open('books.json', 'r' , encoding='utf-8') as file:
        return json.load(file)

def find_book(title=str)->str:
    books = load_books()
    cleaned_title = title.strip().lower()
    for book in books:
        if book['title'].strip().lower() == cleaned_title:
            return json.dumps({  #dumps:  Converts JSON to text

                'found': True,
                'book_id': book['book_id'],
                'title': book['title'],
            })
        return json.dumps({
                'found': False,
                'book_id' : None,
                'title': title,
            })

def check_availability(book_id:int)->str:
    books = load_books()
    for book in books:
        if book['book_id'] == book_id:
            return json.dumps({
                'found': True,
                'book_id': book['book_id'],
                'available_copies': book['available_copies'],
                  })
        return json.dumps({
                "error": "Book ID not found",
                'book_id': book_id,
            })
    







  


     
       
    




