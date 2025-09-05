import os
import json
import re
from google import genai
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY not set in .env!")

gemini_client = genai.Client(api_key=gemini_api_key)


def extract_tasks_from_email(email):
    """
    Takes an email dict and returns a Python list of task dicts:
    [
        {
            "sender": "Name <email@example.com>",
            "task": "Apply to internship",
            "due_date": "2025-09-08",
            "email_link": "https://mail.google.com/..."
        },
        ...
    ]
    """
    full_text = (
        f"From: {email['from']}\n"
        f"Date: {email['date']}\n"
        f"Subject: {email['subject']}\n"
        f"Email Link: {email['email_link']}\n"
        f"{email['body']}"
    )

    prompt = f"""
You are an assistant that extracts actionable tasks from the following email.
Respond ONLY with a valid JSON array. Do not add any explanations or extra text.
Return JSON array of tasks with fields:
- sender: sender's name and email address in the format "Name <email@example.com>"
- task: short action item
- due_date: YYYY-MM-DD or null
- email_link: link to the email
If there are no tasks, return an empty list.

Email:
\"\"\"{full_text}\"\"\"
"""

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )

    # Extract JSON array from the response text
    try:
        match = re.search(r"\[.*\]", response.text, re.DOTALL)
        if match:
            tasks = json.loads(match.group(0))
            return tasks
        else:
            print("No JSON array found in Gemini response.")
            print("Response text:", response.text)
            return []
    except Exception as e:
        print("Error parsing Gemini response:", e)
        print("Response text:", response.text)
        return []
