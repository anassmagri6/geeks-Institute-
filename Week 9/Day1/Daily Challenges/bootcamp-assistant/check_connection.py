import os
import sys
from dotenv import load_dotenv
from openai import OpenAI
load_dotenv()


api_key = os.getenv("NVIDIA_API_KEY")
BASE_URL = os.getenv("BASE_URL")
model = os.getenv("MODEL")
embed_model = os.getenv("EMBEDDING_MODEL")


if not api_key:
    print("ERROR: NVIDIA_API_KEY is missing in .env")
    sys.exit(1) ## exit the program



client  = OpenAI(
    api_key=api_key,
    base_url= BASE_URL,
    timeout=65.0,
    max_retries=2,
)

chat = client.chat.completions.create(
    model=model,
    messages=[{"role": "user", "content": "Say hello in one short sentence."}],
    max_tokens=50,
    temperature=0.5,
)
print("Chat OK:", chat.choices[0].message.content)

  
emb = client.embeddings.create(
    model=model,
    input=['This is a short test sentence for embedding."'],
    extra_body={"input_type": "query", "truncate": "END"},
)
dims = len(emb.data[0].embedding)
print("Embedding OK. Dimensions:", dims)









 