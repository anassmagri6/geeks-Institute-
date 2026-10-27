import json
from pathlib import Path
import pymupdf ##Open PDF files and extract text and images from them.
from langchain_text_splitters import RecursiveCharacterTextSplitter##Dividing long texts into small parts to facilitate processing by artificial intelligence.


PDF_PATH = Path('NovaTech_Overview.pdf')

def extract_pages(pdf_path:str)->list[dict]:
    source = Path(pdf_path)
    pages = []
    with pymupdf.open(source) as pdf:
        for index, page in enumerate(pdf):
            text = page.get_text('text').strip()
            pages.append({
                "filename": source.name,
                "page": index + 1,
                "text": text,
                "extraction_method": "pymupdf",
                "status": "extracted" if text else "no_text",
            })
    return pages

def create_chunks(pages: list[dict]) -> list[dict]:
    splitter  = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = []
    for page in pages:
        if not page['text'].strip():
            continue
    for index, text in enumerate(splitter.split_text(page["text"]), 1):##Divide the page text into parts, then go through each part. index starts from number 1.
        chunk_id = f"{page['filename']}-p{page['page']}-chunk{index}"##Create a unique identifier that shows the file name, page number, and part number.
        chunks.append({
                "id": chunk_id,
                "page_content": text,
                "metadata": {
                    "filename": page["filename"],
                    "page": page["page"],
                    "chunk_index": index,
                    "chunk_id": chunk_id,
                    "extraction_method": page["extraction_method"],
                },
            })
    return chunks

if __name__ == "__main__":
    pages = extract_pages(PDF_PATH)
    for page in pages:
        print(f"Page {page['page']}: {len(page['text'])} characters; {page['status']}")
        
    output = Path("output")
    output.mkdir(exist_ok=True)
    (output / "pages.json").write_text(
        json.dumps(pages, ensure_ascii=False, indent=2), encoding="utf-8")
    chunks = create_chunks(pages)
    (output / "chunks.json").write_text(
        json.dumps(chunks, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {len(chunks)} chunks.")

        







           


            





