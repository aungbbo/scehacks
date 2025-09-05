import os
import os.path
import base64
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def get_header(headers, name):
    for h in headers:
        if h["name"].lower() == name.lower():
            return h["value"]
    return None


def decode_body(body):
    data = body.get("data")
    if not data:
        return ""
    decoded_bytes = base64.urlsafe_b64decode(data.encode("UTF-8"))
    return decoded_bytes.decode("utf-8", errors="ignore")


def fetch_latest_emails(max_results=2):
    """Return a list of dicts with sender, subject, date, body"""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("gmail", "v1", credentials=creds)

        results = (
            service.users()
            .messages()
            .list(userId="me", q="category:primary", maxResults=max_results)
            .execute()
        )

        messages = results.get("messages", [])
        emails = []

        for message in messages:
            msg = (
                service.users()
                .messages()
                .get(userId="me", id=message["id"], format="full")
                .execute()
            )

            headers = msg["payload"]["headers"]
            subject = get_header(headers, "Subject")
            sender = get_header(headers, "From")
            sent_date = get_header(headers, "Date")

            body_text = ""
            payload = msg["payload"]
            if "parts" in payload:
                for part in payload["parts"]:
                    if part["mimeType"] == "text/plain":
                        body_text = decode_body(part["body"])
                        break
            else:
                body_text = decode_body(payload["body"])

            emails.append(
                {
                    "from": sender,
                    "subject": subject,
                    "date": sent_date,
                    "body": body_text.strip(),
                    "email_link": f"https://mail.google.com/mail/u/0/#inbox/{message['id']}",
                }
            )
        return emails
    except HttpError as error:
        print(f"An error occurred: {error}")
        return []
