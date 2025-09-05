# InboxIQ - Gmail Task Extractor

**InboxIQ** is a web application that connects to your Gmail account and extracts actionable tasks from emails using AI. It helps users, students, and professionals quickly identify tasks like online assessments, documents to sign, or networking emails, and presents them in an intuitive to-do list interface.

## 📧 Overview

Every day, millions of people get overwhelmed by their inbox. InboxIQ optimizes your email workflow by scanning your Gmail for tasks based on user preferences and displaying them with relevant information such as sender, subject, due date, and a direct email link.

**Tech Stack:**

- **Frontend:** Next.js & Tailwind CSS
- **Backend:** Python & Flask
- **AI Integration:** Google Gemini API for task extraction
- **Authentication:** Google OAuth

---

## ✨ Features

- 🔐 Google OAuth authentication for Gmail access
- 📬 Gmail integration to read emails securely
- 🤖 AI-based task extraction from email content
- 📋 Modern to-do list style interface
- 📊 Displays task details: sender, subject, due date, email link

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ and pip
- Google Cloud project with Gmail API enabled
- Google Gemini API access and key

### Setup

#### 1. Clone the repository

```bash
git clone <repository-url>
```

#### 2. Install frontend dependencies

```bash
npm install
```

#### 3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### 4. Set up Google OAuth credentials

a. Go to [Google Cloud Console](https://console.cloud.google.com/)
b. Create a new project or select an existing one
c. Enable the Gmail API
d. Go to **Credentials** → **Create OAuth 2.0 Client ID**
e. Choose **Desktop application** as the type
f. Download the credentials JSON file and save it as `credentials.json` in the backend directory

#### 5. Set up Gemini API key

Create a `.env` file in the backend directory with the following:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 6. Run the backend server

```bash
cd backend
python app.py
```

#### 7. Run the frontend

In a new terminal:

```bash
npm run dev
```

#### 8. Access the application

Open [http://localhost:3000](http://localhost:3000) in your browser.

---