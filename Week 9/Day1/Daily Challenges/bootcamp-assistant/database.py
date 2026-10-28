import os
from datetime import datetime, timezone
from pydantic import BaseModel, Field, EmailStr
from pymongo import MongoClient, errors

_client = None

class ProfileIn(BaseModel):
    full_name:       str      = Field(min_length=1)
    phone:           str      = Field(min_length=1)
    email:           EmailStr
    age:             int      = Field(gt=0, lt=120)
    level_education: str      = Field(min_length=1)
    city:            str      = Field(min_length=1)

def _collection():
    global _client
    if _client is None:
        _client = MongoClient(os.getenv("MONGODB_URI"), serverSelectionTimeoutMS=5000)
        col = _client[os.getenv("MONGODB_DB", "bootcamp")][os.getenv("MONGODB_COLLECTION", "registrations")]
        col.create_index("email", unique=True)
        return col
    return _client[os.getenv("MONGODB_DB", "bootcamp")][os.getenv("MONGODB_COLLECTION", "registrations")]

def save_profile(profile: ProfileIn) -> dict:
    now = datetime.now(timezone.utc)
    doc = profile.model_dump()
    doc["email"] = profile.email.strip().lower()
    doc["phone"] = str(doc["phone"])     # preserve + and leading zeros
    doc.update({"status": "lead", "created_at": now, "consent_at": now})
    try:
        res = _collection().insert_one(doc)
        return {"ok": True, "status": "created", "registration_id": str(res.inserted_id)}
    except errors.DuplicateKeyError:
        return {"ok": True, "status": "already_registered"}
    except errors.PyMongoError:
        return {"ok": False, "error": "database unavailable"}