import os, json, dotenv
from openai import OpenAI
from qdrant_client import QdrantClient
from pydantic import ValidationError
from database import ProfileIn, save_profile

dotenv.load_dotenv()
_openai = OpenAI(
    api_key=os.getenv("NVIDIA_API_KEY"),
    base_url=os.getenv("BASE_URL"),
    timeout=30.0, max_retries=2,
)
EMB  = os.getenv("EMBEDDING_MODEL")
COLL = os.getenv("QDRANT_COLLECTION", "bootcamp_faqs")
qc   = QdrantClient(path=os.getenv("QDRANT_PATH", "./qdrant_bootcamp_data"))

# --- tool schemas (unchanged from bootcamp spec) ---
TOOL_DEFINITIONS = [
    {
        "type": "function",
        "function": {
            "name": "get_similar_embeddings",
            "description": "Retrieve relevant bootcamp FAQ information from the knowledge base.",
            "parameters": {
                "type": "object",
                "properties": {
                    "text":  {"type": "string", "description": "The visitor's bootcamp question."},
                    "limit": {"type": "integer", "description": "Number of similar FAQ records to retrieve.", "default": 3},
                },
                "required": ["text"],
                "additionalProperties": False,
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "save_profile_info",
            "description": "Save confirmed bootcamp registration details.",
            "parameters": {
                "type": "object",
                "properties": {
                    "full_name":       {"type": "string"},
                    "phone":           {"type": "string"},
                    "email":           {"type": "string"},
                    "age":             {"type": "integer"},
                    "level_education": {"type": "string"},
                    "city":            {"type": "string"},
                },
                "additionalProperties": False,
                "required": ["full_name", "phone", "email", "age", "level_education", "city"],
            },
            "strict": True,
        },
    },
]

def _embed_query(text: str) -> list[float]:
    resp = _openai.embeddings.create(
        input=text, model=EMB,
        extra_body={"input_type": "query", "truncate": "END"},
    )
    if not resp.data or not resp.data[0].embedding:
        raise RuntimeError("Embedding response was empty.")
    return resp.data[0].embedding

def get_similar_embeddings(text: str, limit: int = 3) -> dict:
    if not isinstance(text, str) or not text.strip():
        return {"error": "query text is required"}
    if not isinstance(limit, int) or isinstance(limit, bool) or not (1 <= limit <= 5):
        limit = 3
    try:
        vec = _embed_query(text)
        hits = qc.query_points(
            collection_name=COLL, query=vec, limit=limit,
            with_payload=True, with_vectors=False,
        ).points
    except Exception as exc:
        return {"error": f"search failed: {type(exc).__name__}"}

    if not hits:
        return {"results": [], "count": 0, "note": "no matching FAQs"}
    return {
        "count": len(hits),
        "results": [{
            "faq_id":   h.payload["faq_id"],
            "question": h.payload["question"],
            "answer":   h.payload["answer"],
            "category": h.payload["category"],
            "source":   h.payload["source"],
            "score":    float(h.score),
        } for h in hits],
    }

def save_profile_info(**args) -> dict:
    # exact field check — never accept unexpected keys
    try:
        profile = ProfileIn(**args)
    except ValidationError as exc:
        return {"ok": False, "error": exc.errors()[:2]}
    return save_profile(profile)

def dispatch(name: str, args: dict) -> dict:
    if name == "get_similar_embeddings":
        if not isinstance(args, dict) or set(args) - {"text", "limit"}:
            return {"error": "invalid arguments"}
        return get_similar_embeddings(args.get("text"), args.get("limit", 3))
    if name == "save_profile_info":
        allowed = {"full_name", "phone", "email", "age", "level_education", "city"}
        if not isinstance(args, dict) or set(args) - allowed:
            return {"ok": False, "error": "unexpected field"}
        return save_profile_info(**args)
    return {"error": "unknown tool name"}