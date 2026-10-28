from qdrant_client import QdrantClient
from qdrant_client.http import models as qm
from sentence_transformers import SentenceTransformer

from config import Config

_client = None
_embedder = None

def get_client():
    global _client
    if _client is None:
        _client = QdrantClient(
            url=Config.QDRANT_URL, api_key=Config.QDRANT_API_KEY
        )
    return _client


def get_embedder():
    global _embedder
    if _embedder is None:
        _embedder = SentenceTransformer(Config.EMBEDDING_MODEL)
    return _embedder


def embed_texts(texts):
    """Returns a list of vectors (list[list[float]])."""
    return get_embedder().encode(
        texts,
        batch_size=32,
        show_progress_bar=False,
        normalize_embeddings=True,
    ).tolist()


def embed_query(text):
    return embed_texts([text])[0]


def ensure_collection():
    client = get_client()
    existing = [c.name for c in client.get_collections().collections]
    if Config.QDRANT_COLLECTION not in existing:
        client.create_collection(
            collection_name=Config.QDRANT_COLLECTION,
            vectors_config=qm.VectorParams(
                size=Config.EMBEDDING_DIM,
                distance=qm.Distance.COSINE,
            ),
        )


def upsert_chunks(points):
    """
    points: list[{"id": int, "vector": list[float],
                 "payload": {"text": str, "page": int}}]
    """
    get_client().upsert(
        collection_name=Config.QDRANT_COLLECTION,
        points=[
            qm.PointStruct(
                id=p["id"], vector=p["vector"], payload=p["payload"]
            )
            for p in points
        ],
    )


def search(query_vector, top_k=5):
    """Returns a list of {"text", "page", "score"}."""
    client = get_client()
    if hasattr(client, "query_points"):
        hits = client.query_points(
            collection_name=Config.QDRANT_COLLECTION,
            query=query_vector,
            limit=top_k,
            with_payload=True,
        ).points
    else:
        hits = client.search(
            collection_name=Config.QDRANT_COLLECTION,
            query_vector=query_vector,
            limit=top_k,
            with_payload=True,
        )

    return [
        {
            "text": h.payload.get("text", ""),
            "page": h.payload.get("page"),
            "score": h.score,
        }
        for h in hits
    ]



