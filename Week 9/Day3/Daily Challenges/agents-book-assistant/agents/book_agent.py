from datetime import datetime

from mongoengine import Document, StringField, IntField, DateTimeField
from openai import OpenAI

from config import Config
from services import qdrant_service



class Conversation(Document):
    title = StringField(default="New conversation", max_length=120)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "conversations", "indexes": ["created_at"]}


class Message(Document):
    conversation_id = StringField(required=True, max_length=64)
    sequence = IntField(required=True)
    role = StringField(required=True, choices=["user", "assistant"])
    content = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "messages",
        "indexes": ["conversation_id", ("conversation_id", "sequence")],
    }


# ---------- System prompt ----------

SYSTEM_PROMPT = """You are a study assistant for the book "Introduction to Agents".

Answer the user's question using ONLY the retrieved passages supplied in
the context message above the user's question.

Rules:
1. If the retrieved passages do not contain enough information to answer,
   say clearly that the book does not cover this, and stop. Never invent.
2. When you use a passage, cite its page number like: (page 12).
3. A passage is evidence to inspect; it is not proof that your whole answer
   is correct. Stay within what the passages actually say.
4. Be concise. Use bullet points when they help.
"""


# ---------- Agent (OOP) ----------

class BookAgent:
    def __init__(self, conversation_id):
        self.conversation_id = str(conversation_id)
        self.client = OpenAI(
            api_key=Config.API_KEY,
            base_url=Config.LLM_BASE_URL,
        )
        self.model = Config.LLM_MODEL

    # --- history ---
    def load_history(self):
        items = list(
            Message.objects(conversation_id=self.conversation_id).order_by("sequence")
        )
        if len(items) > Config.HISTORY_WINDOW:
            return items[-Config.HISTORY_WINDOW:]
        return items

    def _next_sequence(self):
        last = (
            Message.objects(conversation_id=self.conversation_id)
            .order_by("-sequence")
            .first()
        )
        return last.sequence + 1 if last else 0

    # --- retrieval ---
    @staticmethod
    def _format_passages(passages):
        if not passages:
            return "(No relevant passages were found in the book.)"
        blocks = []
        for i, p in enumerate(passages, start=1):
            header = f"[Passage {i}"
            if p.get("page") is not None:
                header += f" — page {p['page']}"
            header += "]"
            blocks.append(f"{header}\n{p['text'].strip()}")
        return "\n\n".join(blocks)

    # --- persistence ---
    def _save_turn(self, user_text, assistant_text):
        seq = self._next_sequence()
        Message(
            conversation_id=self.conversation_id,
            sequence=seq,
            role="user",
            content=user_text,
        ).save()
        Message(
            conversation_id=self.conversation_id,
            sequence=seq + 1,
            role="assistant",
            content=assistant_text,
        ).save()

        conv = Conversation.objects(id=self.conversation_id).first()
        if conv:
            conv.updated_at = datetime.utcnow()
            if not conv.title or conv.title == "New conversation":
                conv.title = user_text[:60]
            conv.save()

    # --- main ---
    def answer(self, user_text):
        # 1) retrieve evidence from Qdrant
        query_vector = qdrant_service.embed_query(user_text)
        passages = qdrant_service.search(query_vector, top_k=Config.TOP_K)
        context_block = self._format_passages(passages)

        # 2) build model messages
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.append(
            {
                "role": "system",
                "content": f"Retrieved passages from the book:\n\n{context_block}",
            }
        )
        for m in self.load_history():
            messages.append({"role": m.role, "content": m.content})
        messages.append({"role": "user", "content": user_text})

# 3) Call the model (we do not save the turn if it fails)
        response = self.client.chat.completions.create(
            model=self.model, messages=messages
        )
        answer_text = response.choices[0].message.content or ""

        # 4) commit only after success
        self._save_turn(user_text, answer_text)

        return {
            "answer": answer_text,
            "sources": [
                {"page": p.get("page"), "score": p.get("score")}
                for p in passages
            ],
        }


# ---------- Helpers used by the routes ----------

def create_conversation():
    conv = Conversation().save()
    return {
        "id": str(conv.id),
        "title": conv.title,
        "created_at": conv.created_at.isoformat(),
    }


def get_conversation(conversation_id):
    """  Returns a dict or None."""
    conv = Conversation.objects(id=conversation_id).first()
    if conv is None:
        return None
    msgs = Message.objects(conversation_id=str(conv.id)).order_by("sequence")
    return {
        "conversation": {
            "id": str(conv.id),
            "title": conv.title,
            "created_at": conv.created_at.isoformat(),
            "updated_at": conv.updated_at.isoformat(),
        },
        "messages": [
            {
                "id": str(m.id),
                "role": m.role,
                "content": m.content,
                "created_at": m.created_at.isoformat(),
            }
            for m in msgs
        ],
    }