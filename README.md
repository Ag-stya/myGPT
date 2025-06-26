# 🧠 myGPT — A GPT built with React, Node.js & OpenAI API

A full-stack, minimal GPT  built using **React** (frontend), **Node.js + Express** (backend), and **OpenAI's Chat Completion API**. Messages are persistent using `localStorage`, and chat history is organized with titles and timestamps.

![myGPT UI](https://i.imgur.com/ZJSUuzx.png) <!-- You can replace with your screenshot URL -->

---

## 🚀 Features

- ✅ ChatGPT-style interaction using OpenAI's API
- ✅ Titles for each conversation
- ✅ Message timestamps
- ✅ Persistent chat history via `localStorage`
- ✅ Sidebar with history navigation
- ✅ Auto-scroll to latest message

---

## 🛠️ Tech Stack

- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **API:** OpenAI GPT-3.5 Turbo
- **Storage:** Browser `localStorage`


myGPT/
│
├── server.js            # Express server
├── .env                 # Your API key (gitignored)
├── package.json
├── public/
│
├── src/
│   ├── App.js           # Main React component
│   ├── index.js
│   ├── styles.css       # Chat UI styles
│
├── .gitignore
└── README.md

---

## ⚙️ Setup Instructions


```bash
git clone https://github.com/Ag-stya/myGPT.git
cd myGPT
touch .env
API_KEY=your_openai_api_key_here


##Install Dependencies
npm install


Start the backend:
npm run start:backend
Starts the Express server on http://localhost:8000

Start the frontend:
npm run start:frontend
Starts the React development server on http://localhost:3000
