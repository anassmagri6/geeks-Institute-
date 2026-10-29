import os
import requests
from dotenv import load_dotenv

load_dotenv()


# Send an approved email through Brevo's transactional API.
# This actually delivers the email, so the caller MUST obtain user approval first.
def send_email(to_email: str, subject: str, body: str) -> dict:
    api_key = os.getenv("BREVO_API_KEY")
    sender = os.getenv("BREVO_SENDER_EMAIL")
    if not api_key or not sender:
        raise ValueError("Configure BREVO_API_KEY and BREVO_SENDER_EMAIL")

    response = requests.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={
            "api-key": api_key,
            "content-type": "application/json",
            "accept": "application/json",
        },
        json={
            "sender": {"email": sender},
            "to": [{"email": to_email}],
            "subject": subject,
            "textContent": body,
        },
        timeout=20,
    )
    response.raise_for_status()
    return response.json()