import os
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, ConfigDict

load_dotenv()

api_key = os.getenv("API_KEY")
if not api_key or api_key == "PASTE_YOUR_NVIDIA_KEY_HERE":
    raise RuntimeError("Set API_KEY in your local .env file first.")

client = OpenAI(
    base_url=os.environ["BASE_URL"],
    api_key=api_key,
    timeout=60.0,
    max_retries=0,
)

class ConnectionResult(BaseModel):
    model_config = ConfigDict(extra="forbid")# Do not accept any increment field that is not in the template
    ok: bool

try:
    completion = client.beta.chat.completions.parse(
        model=os.environ["MODEL"],
        messages=[{"role": "user", "content": "Return {\"ok\": true}"}],
        response_format=ConnectionResult,
        max_tokens=256,
    )
    
    parsed_result = completion.choices[0].message.parsed
    print(f"Structured output success: {parsed_result}")
except Exception as e:
    print(f"Structured output failed: {e}")