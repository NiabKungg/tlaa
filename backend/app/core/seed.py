"""
Seed initial admin user on first startup.
"""
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.core.security import get_password_hash
from app.core.config import settings


async def seed_admin():
    """Create the default admin user if it doesn't exist."""
    from app.models.user import User

    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(User).where(User.email == settings.admin_email)
        )
        existing = result.scalar_one_or_none()

        if existing is None:
            admin = User(
                email=settings.admin_email,
                hashed_password=get_password_hash(settings.admin_password),
                full_name="TLAA Admin",
                is_active=True,
                is_superadmin=True,
            )
            session.add(admin)
            await session.commit()
            print(f"✅ Seeded admin user: {settings.admin_email}")
        else:
            print(f"ℹ️  Admin user already exists: {settings.admin_email}")
