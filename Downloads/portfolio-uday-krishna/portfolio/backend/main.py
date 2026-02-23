"""
Uday Krishna Seetha – Portfolio Backend
FastAPI + OpenRouter + SQLite chat history
"""

import os
import uuid
import json
import asyncio
from datetime import datetime
from typing import List, Optional
from contextlib import asynccontextmanager

import aiosqlite
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# ── Config ──────────────────────────────────────────────────────────────────
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_MODEL   = os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3.1-8b-instruct:free")
DB_PATH            = os.getenv("DB_PATH", "portfolio.db")
ALLOWED_ORIGINS    = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

# ── Resume context (injected into every AI prompt) ──────────────────────────
RESUME_CONTEXT = """
You are an AI assistant for Uday Krishna Seetha's portfolio website.
Answer questions based ONLY on the information below. Be conversational, concise, and helpful.
If asked something not covered here, say you don't have that information.

== PERSONAL INFO ==
Name: Uday Krishna Seetha
Location: Macherla, Andhra Pradesh (522426)
Email: udaykrishnaseetha2004@gmail.com
Phone: +91 8688797070
Status: Final year student, available for opportunities (internships, full-time roles)

== EDUCATION ==
• B.Tech CSE — KL Deemed to be University, AP | Jul 2022 – Jun 2026 | CGPA: 9.01/10
  Specializing in Cyber Security & Blockchain Technology
• Intermediate — Sri Chaitanya Junior College, AP | Jul 2020 – May 2022 | CGPA: 8.9/10
• SSC (10th) — KrishnaVeni Talent School, AP | Jul 2019 – Apr 2020 | CGPA: 10/10 (Perfect score)

== SKILLS ==
Languages: C, Java, Python
Web: HTML, CSS, JavaScript, React, React Native, Next.js
Backend: Django, Spring Boot, Express.js, Node.js
Databases: MySQL, MongoDB
Cloud/Tools: AWS (IAM, DynamoDB, Lambda, API Gateway, S3), GitHub
Soft Skills: Teamwork, Leadership, Communication, Learning Agility

== CERTIFICATIONS ==
• AWS Certified Cloud Practitioner (CLF-C02) — Jun 2024–27
• Red Hat Certified Enterprise Application Developer (240-195-867) — Dec 2024
• Salesforce AI Associate — Oct 2024

== WORK EXPERIENCE ==
Cloud Virtual Internship — AICTE EduSkills (AWS Academy Cohorts 8 & 9) | Jan – Mar 2024
  • Completed 10+ AWS labs: IAM, DynamoDB, Lambda, API Gateway, S3
  • Gained practical cloud computing skills and data handling in virtual environments
  • Worked on cloud simulations: secure data flow, storage, access management

== PROJECTS ==
1. E-Commerce Supply Chain Management System (Python + Django)
   • Full-stack system; automated supplier notifications → 20% reduction in shipment delays
   • Integrated secure payment gateways; optimized database performance

2. Online Voting System (MERN Stack — MongoDB, Express, React, Node.js)
   • Secure, transparent election platform with JWT authentication + encryption
   • 3 distinct user roles for access control; prevents unauthorized data manipulation

3. Certification Tracking System (Java + Spring Boot + React.js)
   • Scalable full-stack credential management system
   • Automated certificate verification pipeline
   • Secure, scalable Spring Boot database schema for certificate storage/retrieval

== OBJECTIVE ==
Passionate CS student seeking Software Engineering or Full Stack Developer roles.
Focused on building secure, scalable, and user-centric web applications.
Expertise areas: Cyber Security, Blockchain, Cloud Computing, Full Stack Development.
"""

# ── DB helpers ───────────────────────────────────────────────────────────────
async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS chat_sessions (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS chat_messages (
                id TEXT PRIMARY KEY,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY(session_id) REFERENCES chat_sessions(id)
            )
        """)
        await db.commit()


async def save_message(session_id: str, role: str, content: str):
    async with aiosqlite.connect(DB_PATH) as db:
        # Ensure session exists
        await db.execute(
            "INSERT OR IGNORE INTO chat_sessions(id, created_at) VALUES(?, ?)",
            (session_id, datetime.utcnow().isoformat())
        )
        await db.execute(
            "INSERT INTO chat_messages(id, session_id, role, content, created_at) VALUES(?, ?, ?, ?, ?)",
            (str(uuid.uuid4()), session_id, role, content, datetime.utcnow().isoformat())
        )
        await db.commit()


async def get_stats():
    async with aiosqlite.connect(DB_PATH) as db:
        cur = await db.execute("SELECT COUNT(DISTINCT session_id) FROM chat_messages")
        sessions = (await cur.fetchone())[0]
        cur = await db.execute("SELECT COUNT(*) FROM chat_messages")
        total_msgs = (await cur.fetchone())[0]
        cur = await db.execute(
            "SELECT content FROM chat_messages WHERE role='user' ORDER BY created_at DESC LIMIT 5"
        )
        recent = [row[0] for row in await cur.fetchall()]
    return {"sessions": sessions, "total_messages": total_msgs, "recent_questions": recent}


# ── Lifespan ──────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="Uday Portfolio API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────────────────────────────────────
class HistoryMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[HistoryMessage]] = []
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: Optional[str] = None
    session_id: str
    model: str
    skills: Optional[dict] = None
    projects: Optional[dict] = None
    experience: Optional[dict] = None
    education: Optional[dict] = None


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "ok", "service": "Uday Portfolio API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    
    # Analyze the user's message to determine what information to return
    message_lower = req.message.lower()
    
    # Return structured data based on the query
    if "skill" in message_lower:
        return ChatResponse(
            session_id=session_id,
            model="structured-response",
            skills={
                "Frontend": ["React.js", "HTML", "CSS", "JavaScript", "TypeScript", "Next.js"],
                "Backend": ["Java", "Python", "Node.js", "Django", "Spring Boot", "REST APIs", "FastAPI"],
                "Databases": ["SQL", "MongoDB", "SQLite", "PostgreSQL"],
                "Cloud": ["AWS EC2", "S3", "Lambda"],
                "Security": ["JWT", "API Security", "RBAC", "Cyber Security"],
                "Tools": ["Git", "GitHub", "Docker", "CI/CD"],
                "Languages": ["C", "Java", "Python", "JavaScript", "TypeScript"]
            }
        )
    elif "project" in message_lower:
        return ChatResponse(
            session_id=session_id,
            model="structured-response",
            projects={
                "featured_projects": [
                    {
                        "name": "Portfolio Website",
                        "description": "Personal portfolio with AI chat assistant",
                        "tech": ["React", "FastAPI", "TypeScript", "Tailwind CSS"],
                        "status": "Completed"
                    },
                    {
                        "name": "E-Commerce Platform",
                        "description": "Full-stack e-commerce solution",
                        "tech": ["React", "Node.js", "MongoDB", "Stripe API"],
                        "status": "In Progress"
                    }
                ]
            }
        )
    elif "experience" in message_lower or "education" in message_lower:
        return ChatResponse(
            session_id=session_id,
            model="structured-response",
            education={
                "btech": {
                    "degree": "B.Tech CSE",
                    "university": "KL Deemed to be University, AP",
                    "period": "Jul 2022 – Jun 2026",
                    "cgpa": "9.01/10",
                    "specialization": "Cyber Security & Blockchain Technology"
                },
                "intermediate": {
                    "college": "Sri Chaitanya Junior College, AP",
                    "period": "Jul 2020 – May 2022",
                    "cgpa": "8.9/10"
                },
                "ssc": {
                    "school": "KrishnaVeni Talent School, AP",
                    "period": "Jul 2019 – Apr 2020",
                    "cgpa": "10/10"
                }
            }
        )
    else:
        # Default response with general information
        return ChatResponse(
            session_id=session_id,
            model="structured-response",
            response="I'm Uday's AI assistant! I can provide information about his skills, projects, education, and experience. Ask me about any specific aspect!",
            skills={
                "Frontend": ["React.js", "HTML", "CSS", "JavaScript", "TypeScript", "Next.js"],
                "Backend": ["Java", "Python", "Node.js", "Django", "Spring Boot", "REST APIs", "FastAPI"],
                "Databases": ["SQL", "MongoDB", "SQLite", "PostgreSQL"],
                "Cloud": ["AWS EC2", "S3", "Lambda"],
                "Security": ["JWT", "API Security", "RBAC", "Cyber Security"],
                "Tools": ["Git", "GitHub", "Docker", "CI/CD"],
                "Languages": ["C", "Java", "Python", "JavaScript", "TypeScript"]
            }
        )


@app.get("/api/stats")
async def stats():
    return await get_stats()


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
