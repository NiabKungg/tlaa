"""
Admin CMS API endpoints – JWT authentication required.
"""
import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.user import User
from app.models.cms import PageContent, MenuItem, SiteSetting
from app.schemas.cms import (
    PageContentCreate, PageContentUpdate, PageContentResponse,
    MenuItemCreate, MenuItemUpdate, MenuItemResponse,
    SiteSettingCreate, SiteSettingUpdate, SiteSettingResponse,
)

router = APIRouter()


# ═══════════════════════════════════════════
# Page Content CRUD
# ═══════════════════════════════════════════

@router.get("/pages/{page_name}", response_model=List[PageContentResponse])
async def admin_get_page_content(
    page_name: str,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    """Get all content sections for a page (including inactive)."""
    result = await db.execute(
        select(PageContent)
        .where(PageContent.page_name == page_name)
        .order_by(PageContent.order)
    )
    return result.scalars().all()


@router.post("/pages", response_model=PageContentResponse, status_code=201)
async def create_page_content(
    data: PageContentCreate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    """Create a new content section."""
    content = PageContent(**data.model_dump())
    db.add(content)
    await db.flush()
    await db.refresh(content)
    return content


@router.put("/pages/{content_id}", response_model=PageContentResponse)
async def update_page_content(
    content_id: int,
    data: PageContentUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    """Update an existing content section."""
    result = await db.execute(select(PageContent).where(PageContent.id == content_id))
    content = result.scalar_one_or_none()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(content, field, value)

    await db.flush()
    await db.refresh(content)
    return content


@router.delete("/pages/{content_id}", status_code=204)
async def delete_page_content(
    content_id: int,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    """Delete a content section."""
    result = await db.execute(select(PageContent).where(PageContent.id == content_id))
    content = result.scalar_one_or_none()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    await db.delete(content)


# ═══════════════════════════════════════════
# Menu Item CRUD
# ═══════════════════════════════════════════

@router.get("/menu", response_model=List[MenuItemResponse])
async def admin_get_menu(
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(MenuItem).order_by(MenuItem.order))
    return result.scalars().all()


@router.post("/menu", response_model=MenuItemResponse, status_code=201)
async def create_menu_item(
    data: MenuItemCreate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    item = MenuItem(**data.model_dump())
    db.add(item)
    await db.flush()
    await db.refresh(item)
    return item


@router.put("/menu/{item_id}", response_model=MenuItemResponse)
async def update_menu_item(
    item_id: int,
    data: MenuItemUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(MenuItem).where(MenuItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    await db.flush()
    await db.refresh(item)
    return item


@router.delete("/menu/{item_id}", status_code=204)
async def delete_menu_item(
    item_id: int,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(MenuItem).where(MenuItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    await db.delete(item)


# ═══════════════════════════════════════════
# Site Settings CRUD
# ═══════════════════════════════════════════

@router.get("/settings", response_model=List[SiteSettingResponse])
async def admin_get_settings(
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(SiteSetting))
    return result.scalars().all()


@router.post("/settings", response_model=SiteSettingResponse, status_code=201)
async def create_setting(
    data: SiteSettingCreate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    setting = SiteSetting(**data.model_dump())
    db.add(setting)
    await db.flush()
    await db.refresh(setting)
    return setting


@router.put("/settings/{key}", response_model=SiteSettingResponse)
async def update_setting(
    key: str,
    data: SiteSettingUpdate,
    db: AsyncSession = Depends(get_db),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(SiteSetting).where(SiteSetting.key == key))
    setting = result.scalar_one_or_none()
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(setting, field, value)
    await db.flush()
    await db.refresh(setting)
    return setting


# ═══════════════════════════════════════════
# File Upload
# ═══════════════════════════════════════════

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    _admin: User = Depends(get_current_admin),
):
    """Upload a file (image, document) and return the URL."""
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail=f"File type not allowed: {file.content_type}")

    # Generate unique filename
    ext = os.path.splitext(file.filename)[1] if file.filename else ".bin"
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join("uploads", unique_name)

    # Save file
    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    return {"filename": unique_name, "url": f"/uploads/{unique_name}"}
