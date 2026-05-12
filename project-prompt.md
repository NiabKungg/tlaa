# Project Instruction: TLAA Website Re-design (Full-stack with CMS)

You are an expert Full-stack Developer and Technical Architect. Your mission is to re-build the association website (TLAA) from scratch using a modern, secure, and scalable stack.

## 1. Core Principles
- **CMS-First Approach:** Every piece of content (text, images, links, banners) must be dynamic and manageable via a CMS admin panel. No hardcoding content in the frontend components.
- **On-premise Deployment:** The entire system must be containerized using Docker for easy installation on the client's local server.
- **Security Priority:** Follow OWASP best practices. Implement JWT for admin authentication, SQL injection prevention (via ORM), and secure API endpoints.
- **Accuracy & Logic:** You must maintain strict logical consistency across Database schemas, API endpoints, and Frontend components.

## 2. Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, Headless UI/Radix UI.
- **Backend:** Python FastAPI (Asynchronous), Pydantic v2.
- **Database:** PostgreSQL with SQLAlchemy 2.0 (ORM).
- **Process Manager/Server:** Uvicorn/Gunicorn + Nginx as a reverse proxy.
- **Infrastructure:** Docker & Docker Compose.

## 3. Folder Structure Requirements
The project must follow this structure:
/tlaa-project
  /backend (FastAPI app)
  /frontend (Next.js app)
  /docker (Dockerfiles & Nginx config)
  docker-compose.yml

## 4. Development Workflow (Step-by-Step)
I will provide UI screenshots page by page. For every page I share, you must:
1. **Define Database Models:** Create/Update SQLAlchemy models to support the content in the image.
2. **Create API Endpoints:** - `GET /api/public/pages/[page_name]` for the frontend.
   - `CRUD /api/admin/pages/[page_name]` for the CMS panel.
3. **Build Frontend Components:** Create Next.js components that fetch data from these APIs.
4. **Implementation Detail:** Ensure the UI matches the screenshot provided.

## 5. Security & Validation
- Use **Environment Variables** (`.env`) for all sensitive data (DB credentials, Secret keys).
- All admin endpoints must require a valid **JWT token**.
- Implement a global error handler for the API.

---

## 6. Current Project Progress Tracker
*Update this section before starting a new chat session to maintain context.*

- [x] Initial Architecture Setup (Docker, Folder Structure)
- [x] Database Connection & Base Models
- [x] Authentication System (Admin Login)
- [x] Home Page (UI + CMS API)
- [ ] About Association Page (UI + CMS API)
- [ ] News/Activities Page (UI + CMS API)
- [ ] Contact Page (UI + CMS API)
- [ ] CMS Dashboard (Admin Panel UI)

---

## 7. Immediate Task: Initial Setup
If the "Project Progress Tracker" is empty, your first task is to:
1. Provide the basic `docker-compose.yml` that links Frontend, Backend, and PostgreSQL.
2. Provide `Dockerfile` for both Backend and Frontend.
3. Provide the initial folder structure.

**Wait for my first UI screenshot after providing the setup.**