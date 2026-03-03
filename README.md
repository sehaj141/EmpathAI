#  EmpathAI – Voice-Based AI Psychological Support Assistant

EmpathAI is a full-stack conversational application designed to simulate emotionally supportive dialogue through a voice-enabled chat interface.

The system integrates a modern chat UI, voice recording functionality, browser-based speech recognition, and backend conversational logic to demonstrate AI-assisted interaction design.

This project showcases full-stack architecture, voice processing integration, and conversational system development.

---

##  Project Objective

The goal of EmpathAI is to simulate a professional psychological assistance interface that:

- Encourages reflective conversation
- Responds in an empathetic tone
- Detects emotional context from user input
- Provides a structured and safe conversational flow

⚠️ Disclaimer: This is a demonstration project and is not a substitute for licensed psychological or medical care.

---

##  Key Features

###  Conversational Chat Interface
- Left-right chat layout (User vs Assistant)
- Real-time message rendering
- Clean, responsive UI design
- Loading indicators for AI responses
- Multi-language support

###  Voice Note Functionality
- Click-to-record microphone interaction
- Recording duration display
- Voice note playback support (WhatsApp-style UI)
- Browser-based speech recognition (Web Speech API)

###  Empathetic Response Engine
- Emotion-aware response logic
- Keyword-based mood detection
- Calm and supportive reply tone
- Structured conversational patterns

### Crisis Awareness Layer
- Basic high-risk keyword detection
- Conditional escalation-style response handling

---

##  Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Lucide Icons
- MediaRecorder API
- Web Speech API

### Backend
- Node.js
- Express.js
- Modular service-based structure
- Local LLM experimentation using Ollama (development environment)

---

##  System Architecture

Development Architecture:

Frontend (React + Vite)
↓
Node.js Backend (Express)
↓
Local Conversational Logic / Ollama (Development)

---

##Screenshots

![EmpathAI Chat Demo](https://github.com/user-attachments/assets/8cc01cf2-2152-483b-9637-e2aad10c1833)
![EmpathAI Chat Demo](https://github.com/user-attachments/assets/108eaa82-9461-4d38-bb09-d77dd96b02ed)
![EmpathAI Chat Demo](https://github.com/user-attachments/assets/a74118d1-d093-49b1-b69a-19a13f3b21fc)
![EmpathAI Chat Demo](https://github.com/user-attachments/assets/71884e78-e885-4a7b-8c71-e3ab5e161665)
![EmpathAI Chat Demo](https://github.com/user-attachments/assets/4765b026-a462-4ce7-9615-e30150acb03a)

---

##  Local Setup Instructions

 1️⃣ Clone Repository

```bash
git clone https://github.com/sehaj141/EmpathAI.git
cd your-repo

2️⃣ Install Frontend Dependencies
cd frontend
npm install
npm run dev
3️⃣ Install Backend Dependencies
cd backend
npm install
node server.js
4️⃣  Run with Ollama
If using local LLM:
ollama run llama3

Ensure Ollama is running before starting backend.

---

##  Design Philosophy

EmpathAI was designed to simulate emotionally intelligent conversation patterns rather than a generic chatbot.

The project emphasizes:
* Clean separation between UI and backend logic
* Voice-first interaction design
* Structured conversational tone
* Modular backend services
* Practical AI system experimentation

---

##  What This Project Demonstrates
* Full-stack development
* Voice-based interface implementation
* Conversational system design
* API integration
* Local LLM experimentation
* Debugging and modular architecture design

---

##  Future Enhancements
* Cloud-based LLM deployment
* Persistent chat history storage
* User authentication system
* Advanced sentiment analysis
* Production deployment

---



