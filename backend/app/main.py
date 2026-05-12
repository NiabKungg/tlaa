"""
TLAA Backend – FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.core.database import engine, Base
from app.api import public, admin, auth, home_public, home_admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create database tables on startup."""
    async with engine.begin() as conn:
        # Import all models so create_all picks them up
        import app.models.user  # noqa: F401
        import app.models.cms   # noqa: F401
        import app.models.home  # noqa: F401
        await conn.run_sync(Base.metadata.create_all)

    # Seed default admin user
    from app.core.seed import seed_admin
    await seed_admin()

    yield


app = FastAPI(
    title="TLAA CMS API",
    description="Content Management System API for the Thai Logistics Association of Academics website.",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Static files (uploads) ──
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ── Routers ──
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(public.router, prefix="/api/public", tags=["Public"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin CMS"])
app.include_router(home_public.router, prefix="/api/public/home", tags=["Home Page Public"])
app.include_router(home_admin.router, prefix="/api/admin/home", tags=["Home Page Admin"])


@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "version": "1.0.0"}
