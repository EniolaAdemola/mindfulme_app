# MindfulMe 🧠💜

_An AI-powered mental wellness companion._

MindfulMe is a mobile application built to support users on their mental health journey. With features like daily mood tracking, reflective journaling, personalized insights, and an AI assistant for one-on-one conversations, the app empowers users to build consistency, self-awareness, and positive habits over time.

---

## ✨ Features

- 📓 **Mood Logging & Journaling**  
  Track your daily moods and express your thoughts freely through journaling.

- 🧠 **AI Assistant**  
  Chat with a context-aware AI focused exclusively on mental health support and mood-related discussions.

- 📊 **Insights & Recommendations**  
  Get personalized insights and article recommendations based on your mood and journal patterns.

- 💬 **Motivational Quotes**  
  Receive daily motivational quotes tailored to your emotional patterns and reflections.

- 🔐 **Private & Secure**  
  All data is stored securely using Supabase. You are in control of your personal journey.

---

## ⚙️ Tech Stack

- **Frontend:** React Native
- **Backend:** Supabase
- **AI:** Integrated OpenAI Large Language Model (LLM) for natural and relevant conversations

---

## 🧪 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/EniolaAdemola/mindfulme_app.git
   cd mindfulme_app

   ```

2. **Install dependencies**
   ```bash
     npm install
      # or
     yarn install

   ```
3. **Set up environment variables**

   > **You’ll need two things:**
   >
   > 1. A free **Supabase** project (for storage & auth)
   > 2. An **OpenAI** account (for AI conversations)

   **a. Create a Supabase project**

   1. Sign up / log in at <https://app.supabase.com>.
   2. Click **“New project”**, choose a name, password, and region, then wait for provisioning to finish.
   3. In the project **Settings ▸ API** page copy:
      - **Project URL** – goes into `SUPABASE_URL`
      - **anon public key** – goes into `SUPABASE_ANON_KEY`
   4. Adjust RLS policies or create tables as required by the schema in this repo.

   **b. Get your OpenAI API key**

   1. Go to <https://platform.openai.com/account/api-keys>.
   2. Click **“Create new secret key”** and copy it immediately (you won’t see it again).
   3. This value goes into `OPENAI_API_KEY`.

   **c. Populate the `.env` file**

   Rename `.env.example` ➜ `.env` and replace the placeholders:

   ```env
   # Supabase
   SUPABASE_URL=https://your‑project.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # OpenAI
   OPENAI_API_KEY=sk‑XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   ```

4. **Run the App**
   ```bash
     npx expo start
      # or
     yarn expo start
   ```

### Application View

### Onboarding Screen

![Screenshot 2025-06-19 at 17 04 59](https://github.com/user-attachments/assets/a4f680ce-594b-4f8d-8388-eda890ae7062)

### Home Screen

![Screenshot 2025-06-22 at 08 15 35](https://github.com/user-attachments/assets/716e136f-31d0-48b9-ac65-0b51d5463fc6)

### AI Assistant

![Screenshot 2025-06-22 at 08 14 52](https://github.com/user-attachments/assets/0e2c084f-0789-4a4e-97eb-989e53ee5822)

### Analytics Screen

![Screenshot 2025-06-22 at 08 17 08](https://github.com/user-attachments/assets/4695bb95-8d95-4b0d-8d01-75555d425c57)

### Journal Screen

![Screenshot 2025-06-22 at 08 17 56](https://github.com/user-attachments/assets/7e8d8821-ee51-476b-a0bb-fa188de920f9)

## 🎥 Demo Preview

[![View on Google Drive](https://img.shields.io/badge/View%20Demo-Google%20Drive-blue?logo=google-drive)](https://drive.google.com/drive/folders/1oNyWazAZe9O_CRtY1nAEhyhqLcj-EAtN?usp=drive_link)

See a full preview of the mobile experience, including onboarding, mood tracking, journaling, and AI assistant usage.

# 🙌 Contributions

Feedback, ideas, and contributions are always welcome. Feel free to fork the repo, open issues, or submit pull requests!
