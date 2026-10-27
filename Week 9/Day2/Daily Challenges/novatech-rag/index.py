import json, os, uuid
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient, models#Connect to the Qdrant database to store and search vectors.

load_dotenv()

COLLECTION = "document_chunks"
MODEL =os.getenv("EMBEDDING_MODEL")
DIM = int(os.environ["EMBEDDING_DIM"])#(DIM)It means that each text is converted into a digital vector (Vector) consisting of 768 numbers.

client = OpenAI(api_key=os.environ["OPENROUTER_API_KEY"],
                base_url="https://integrate.api.nvidia.com/v1")

def embed(text: str) -> list[float]:
    vector = client.embeddings.create(model=MODEL, input=text).data[0].embedding
    if len(vector) != DIM:##If DIM = 768 and the vector contains 512 numbers, the condition will be met.
        raise ValueError(f"Expected {DIM} dims, got {len(vector)}")
    return vector

chunks = json.loads(Path("output/chunks.json").read_text(encoding="utf-8"))
db = QdrantClient(path="./qdrant_course_data")

try:
    if not db.collection_exists(COLLECTION):
        db.create_collection(collection_name=COLLECTION,
            vectors_config=models.VectorParams#Vector settings in the group.
            (size=DIM, 
         distance=models.Distance.COSINE ),#How to measure similarity between vectors using (Cosine).))
        on_disk=True,#Store vectors on disk instead of keeping them fully loaded in RAM,
    )
            
    points = [models.PointStruct(
        id=str(uuid.uuid5(uuid.NAMESPACE_URL, c["id"])),
        vector=embed(c["page_content"]),
        payload={"content": c["page_content"], **c["metadata"]},

    ) for c in chunks]
    if points:
        db.upsert(collection_name=COLLECTION, points=points)
    print(f"Indexed {len(points)} chunks")
finally:
    db.close()








