import os, dotenv
dotenv.load_dotenv()
from openai import OpenAI

key = os.getenv("NVIDIA_API_KEY")
if not key:
    raise SystemExit("ERROR: NVIDIA_API_KEY is missing in .env")

client = OpenAI(
    api_key=key,
    base_url=os.getenv("BASE_URL"),
    timeout=30.0, max_retries=2,
)

try:
    r = client.chat.completions.create(
        model=os.getenv("MODEL"),
        messages=[{"role": "user", "content": "Say hello in one sentence."}],
        temperature=0,
    )
    if not r.choices or r.choices[0].finish_reason != "stop":
        raise RuntimeError("chat response incomplete")
    print("Chat OK:", r.choices[0].message.content)

    e = client.embeddings.create(
        model=os.getenv("EMBEDDING_MODEL"),
        input=["Hello"],
        extra_body={"input_type": "query", "truncate": "END"},
    )
    if not e.data or not e.data[0].embedding:
        raise RuntimeError("empty embedding response")
    print("Embedding dims:", len(e.data[0].embedding))
except Exception as exc:
    print("Connection error:", type(exc).__name__, str(exc)[:200])