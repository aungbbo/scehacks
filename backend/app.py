from flask import Flask, request, jsonify
from flask_cors import CORS
from gmail_service import fetch_latest_emails
from task_extractor import extract_tasks_from_email

app = Flask(__name__)

CORS(app)

@app.route("/")
def search_tasks():
    query = request.args.get("query", "").lower()
    if not query:
        return (
            jsonify(
                {"error": "Please provide a query parameter, e.g. ?query=assessment"}
            ),
            400,
        )

    # Fetch latest 10 emails
    emails = fetch_latest_emails(max_results=10)

    # Filter emails containing the query in subject or body
    matched_emails = []
    for email in emails:
        if query in email["subject"].lower() or query in email["body"].lower():
            tasks = extract_tasks_from_email(email)
            matched_emails.append({"subject": email["subject"], "tasks": tasks})

    if not matched_emails:
        return jsonify({"message": f"No emails related to '{query}' found."})

    return jsonify(matched_emails)


if __name__ == "__main__":
    app.run(debug=True)
