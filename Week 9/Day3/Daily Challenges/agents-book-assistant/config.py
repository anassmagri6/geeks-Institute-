import os
from dotenv import load_dotenv
from mongoengine import connect

load_dotenv()


class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "agents_book")

    QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY = os.getenv("QDRANT_API_KEY") or None
    QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "agents_book_chunks")

    EMBEDDING_MODEL = os.getenv(
        "EMBEDDING_MODEL", "openai/gpt-oss-20b"
    )
    EMBEDDING_DIM = int(os.getenv("EMBEDDING_DIM", "384"))

    LLM_MODEL = os.getenv("LLM_MODEL", "openai/gpt-oss-20b")
    LLM_BASE_URL = os.getenv("LLM_BASE_URL", "https://integrate.api.nvidia.com/v1")
    API_KEY = os.getenv("API_KEY")

    PDF_PATH = os.getenv("PDF_PATH", "IntroductiontoAgents.pdf")
    CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "800"))
    CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "120"))

    TOP_K = int(os.getenv("TOP_K", "5"))
    HISTORY_WINDOW = int(os.getenv("HISTORY_WINDOW", "10"))


def connect_db():
    "Connect to MongoDB using the provided configuration."
    try:
        connect(
            db=Config.MONGO_DB_NAME,
            host=Config.MONGO_URI,
        )
        print("Connected to MongoDB successfully 📟📟")
    except Exception as e:
        print(f"Error connecting to MongoDB 📍📍: {e}")