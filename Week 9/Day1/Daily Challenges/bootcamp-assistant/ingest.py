import csv
import os
import sys
import uuid
from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

load_dotenv()

CSV_FILE = "bootcamp_faq.csv"

QDRANT_PATH = os.getenv("QDRANT_PATH", "./qdrant_bootcamp_data")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "bootcamp_faqs")
EMBED_MODEL = os.getenv("EMBEDDING_MODEL")
BASE_URL = os.getenv("BASE_URL")
api_key = os.getenv("NVIDIA_API_KEY")

if not api_key:
    print("ERROR: NVIDIA_API_KEY is missing.")
    sys.exit(1)


client = OpenAI(api_key=api_key, base_url=BASE_URL, timeout=60.0, max_retries=2)

def load_faqs():
    rows = []
    with open(CSV_FILE, mode="r", encoding="utf-8" , newline="") as f:
        reader = csv.DictReader(f, delimiter=",")
        required = {"question", "answer", "category"}
        if not required.issubset({c.strip() for c in reader.fieldnames or []}):
##issubset():The program asks: "Are all the columns I need (contained in the `required` variable) actually present among the file's columns?"
             print("ERROR: CSV must contain question, answer, category columns.")
             sys.exit(1)
        for idx, row in enumerate(reader):##enumerate(reader)It provides you with both the item number and its content.
         q = (row.get('question') or "").strip()
         a = (row.get('answer') or "").strip()
         c = (row.get('category') or "").strip()
         if not q or not a or not c:
             continue
         rows.append({"faq_id": idx,
                       "question": q,
                         "answer": a, 
                         "category": c})
    return rows

def embed_passages (texts):
    resp = client.embeddings.create(
        model =EMBED_MODEL,
        input=[texts],
        extra_body={"input_type": "passage", "truncate": "END"},
    )
    return resp.data[0].embedding


def main():
    faqs = load_faqs()
    if not faqs:
        print("No valid FAQ rows found. Exiting.")
        return
    print(f"Loaded {len(faqs)} FAQ rows from {CSV_FILE}.")##Displays the number of questions loaded and the filename.

    documents = [f"question: {f['question']}\nA: {f['answer']}" for f in faqs]

    first_vector = embed_passages(documents[0])
    dim = len(first_vector)
    print(f"Embedding dimensions: {dim}")

    qdrant = QdrantClient(path=QDRANT_PATH)##QdrantClient: A tool for interacting with the Qdrant database.
    if qdrant.collection_exists(QDRANT_COLLECTION):##(collection exists): checks whether the collection exists.
        existing = qdrant.get_collection(QDRANT_COLLECTION)##get_collection: retrieves collection information
        existing_dim = existing.config.params.vectors.size
    if existing_dim != dim:##Check whether the number of old dimensions differs from the new ones.
            print(f"Vector size changed ({existing_dim} -> {dim}). Rebuilding collection.")
            qdrant.delete_collection(QDRANT_COLLECTION)##Delete the existing group if the number of dimensions differs, in preparation for recreating it.

    if not qdrant.collection_exists(QDRANT_COLLECTION):
        qdrant.create_collection(
            collection_name=QDRANT_COLLECTION,
            vectors_config=VectorParams(size=dim, distance=Distance.COSINE),
        )
        print(f"Created Qdrant collection: {QDRANT_COLLECTION}")

    points = []
    for i, faq in enumerate(faqs):
        vector = first_vector if i == 0 else embed_passages(documents[i])
        point_id = str(uuid.uuid5(uuid.NAMESPACE_URL, f"faq-{faq['faq_id']}"))
   
    









         
        


