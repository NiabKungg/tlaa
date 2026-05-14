"""
Seed initial admin user on first startup.
"""
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.core.security import get_password_hash
from app.core.config import settings


async def seed_admin():
    """Create or UPDATE the default admin user."""
    from app.models.user import User

    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(User).where(User.email == settings.admin_email)
        )
        existing = result.scalar_one_or_none()

        if existing is None:
            # สร้างใหม่ถ้ายังไม่มี
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
            # อัปเดตรหัสผ่านให้ตรงกับ .env ปัจจุบัน
            existing.hashed_password = get_password_hash(settings.admin_password)
            await session.commit()
            print(f"🔄 Updated admin password to match .env: {settings.admin_email}")
