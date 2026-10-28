import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import Config
from services import qdrant_service


def extract_pages(pdf_path):
    doc = fitz.open(pdf_path)
    pages = []
    for page_number, page in enumerate(doc, start=1):
        text = page.get_text("text")
        if text and text.strip():
            pages.append({"page": page_number, "text": text})
    doc.close()
    return pages


def chunk_pages(pages):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=Config.CHUNK_SIZE,
        chunk_overlap=Config.CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
    )
    chunks = []
    for p in pages:
        for text in splitter.split_text(p["text"]):
            cleaned = text.strip()
            if cleaned:
                chunks.append({"text": cleaned, "page": p["page"]})
    return chunks


def ingest():
    print("📖 Extracting pages from PDF...")
    pages = extract_pages(Config.PDF_PATH)
    print(f"   → {len(pages)} pages with text.")

    print("✂️  Splitting into overlapping chunks...")
    chunks = chunk_pages(pages)
    print(f"   → {len(chunks)} chunks.")

    print("🧮 Creating embeddings...")
    vectors = qdrant_service.embed_texts([c["text"] for c in chunks])

    print("🧹 Resetting Qdrant collection...")
    qdrant_service.reset_collection()
    qdrant_service.ensure_collection()

    print("📤 Upserting to Qdrant (payload: text + page)...")
    points = [
        {"id": i, "vector": vectors[i], "payload": chunks[i]}
        for i in range(len(chunks))
    ]
    for start in range(0, len(points), 64):
        qdrant_service.upsert_chunks(points[start : start + 64])

    print(f"✅ Done. {len(chunks)} chunks stored in Qdrant.")


if __name__ == "__main__":
    ingest()