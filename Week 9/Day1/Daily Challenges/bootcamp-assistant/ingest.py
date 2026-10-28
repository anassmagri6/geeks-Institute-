import os, uuid
import dotenv
import pandas as pd
from datetime import datetime, timezone
from openai import OpenAI
from qdrant_client import QdrantClient, models

dotenv.load_dotenv()
client_openai = OpenAI(
    api_key=os.getenv("NVIDIA_API_KEY"),
    base_url=os.getenv("BASE_URL"),
    timeout=60.0, max_retries=2,
)
EMB  = os.getenv("EMBEDDING_MODEL")
COLL = os.getenv("QDRANT_COLLECTION", "bootcamp_faqs")

def embed_passage(text: str) -> list[float]:
    resp = client_openai.embeddings.create(
        input=text, model=EMB,
        extra_body={"input_type": "passage", "truncate": "END"},
    )
    if not resp.data or not resp.data[0].embedding:
        raise RuntimeError("Embedding response was empty.")
    return resp.data[0].embedding

# 1) read CSV with semicolon delimiter (pattern from rag.py)
df = pd.read_csv("bootcamp_faq.csv", sep=";")
for col in ("question", "answer", "category"):
    if col not in df.columns:
        raise SystemExit(f"Missing column: {col}")
df = df.dropna(subset=["question", "answer", "category"])
df = df.apply(lambda s: s.str.strip() if s.dtype == "object" else s)
if (df[["question", "answer", "category"]] == "").any().any():
    raise SystemExit("Empty required values found in CSV.")

# 2) prepare records (pattern from rag.py's prepare_records)
def prepare_records(row):
    content = f"Question: {row['question']}\nAnswer: {row['answer']}\n"
    embedding = embed_passage(content)
    return {
        "id": int(row.name) + 1,          # stable ID from original order
        "vector": embedding,
        "payload": {
            "faq_id":    int(row.name) + 1,
            "question":  row["question"],
            "answer":    row["answer"],
            "category":  row["category"],
            "source":    "bootcamp_faq.csv",
            "created_at": datetime.now(timezone.utc).isoformat(),
        },
    }

records = [prepare_records(r) for _, r in df.iterrows()]
dim = len(records[0]["vector"])
print("Vector size:", dim)

# 3) rebuild if dimensions changed (never mix models)
qc = QdrantClient(path=os.getenv("QDRANT_PATH", "./qdrant_bootcamp_data"))
if qc.collection_exists(COLL):
    info = qc.get_collection(COLL)
    if info.config.params.vectors.size != dim:
        print("Dimension changed — recreating collection.")
        qc.delete_collection(COLL)

if not qc.collection_exists(COLL):
    qc.create_collection(
        collection_name=COLL,
        vectors_config=models.VectorParams(size=dim, distance=models.Distance.COSINE),
    )

# 4) idempotent upsert (stable IDs replace on repeat)
qc.upsert(
    collection_name=COLL,
    points=[models.PointStruct(id=r["id"], vector=r["vector"], payload=r["payload"]) for r in records],
    wait=True,
)
print("Total points:", qc.count(COLL, exact=True).count)
qc.close()