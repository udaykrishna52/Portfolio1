# Uday Krishna Portfolio

A modern portfolio website built with React and FastAPI, featuring an AI-powered chat assistant.

## 🚀 Features

- **Modern React Frontend**: Built with TypeScript, React, and Tailwind CSS
- **FastAPI Backend**: Python backend with SQLite database
- **AI Chat Assistant**: Powered by OpenRouter API
- **Responsive Design**: Works seamlessly on all devices
- **Real-time Chat**: Interactive chat about Uday's skills, projects, and experience

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite

### Backend
- FastAPI
- Python 3.14
- SQLite
- OpenRouter API

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.14+
- OpenRouter API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/udaykrishna52/Portfolio1.git
   cd Portfolio1
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   pip install -r requirements.txt
   
   # Create .env file
   cp .env.example .env
   # Add your OpenRouter API key to .env
   
   uvicorn main:app --reload
   ```

4. **Using Docker**
   ```bash
   docker-compose up
   ```

## 🔧 Environment Variables

### Backend (.env)
```
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## 🌐 Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📱 Sections

- **Hero**: Introduction and call-to-action
- **About**: Personal information and education
- **Skills**: Technical skills and technologies
- **Experience**: Work and project experience
- **Projects**: Featured projects showcase
- **Contact**: Contact information and forms
- **AI Chat**: Interactive assistant for queries

## 🤝 Contributing

This is a personal portfolio. For suggestions or improvements, please create an issue.

## 📄 License

This project is licensed under the MIT License.

## 👤 Contact

**Uday Krishna Seetha**
- Email: udaykrishnaseetha2004@gmail.com
- Phone: +91 8688797070
- Location: Macherla, Andhra Pradesh (522426)
