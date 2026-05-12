"""
Public API endpoints – no authentication required.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.models.cms import PageContent, MenuItem, SiteSetting
from app.schemas.cms import PageContentResponse, MenuItemResponse, SiteSettingResponse

router = APIRouter()


@router.get("/pages/{page_name}", response_model=List[PageContentResponse])
async def get_page_content(page_name: str, db: AsyncSession = Depends(get_db)):
    """Get all active content sections for a specific page."""
    result = await db.execute(
        select(PageContent)
        .where(PageContent.page_name == page_name, PageContent.is_active == True)
        .order_by(PageContent.order)
    )
    sections = result.scalars().all()
    return sections


@router.get("/pages/{page_name}/{section_key}", response_model=PageContentResponse)
async def get_page_section(page_name: str, section_key: str, db: AsyncSession = Depends(get_db)):
    """Get a specific section of a page."""
    result = await db.execute(
        select(PageContent)
        .where(
            PageContent.page_name == page_name,
            PageContent.section_key == section_key,
            PageContent.is_active == True,
        )
    )
    section = result.scalar_one_or_none()
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    return section


@router.get("/menu", response_model=List[MenuItemResponse])
async def get_menu(db: AsyncSession = Depends(get_db)):
    """Get all active menu items."""
    result = await db.execute(
        select(MenuItem)
        .where(MenuItem.is_active == True)
        .order_by(MenuItem.order)
    )
    return result.scalars().all()


@router.get("/settings", response_model=List[SiteSettingResponse])
async def get_site_settings(db: AsyncSession = Depends(get_db)):
    """Get all site settings."""
    result = await db.execute(select(SiteSetting))
    return result.scalars().all()


@router.get("/settings/{key}", response_model=SiteSettingResponse)
async def get_site_setting(key: str, db: AsyncSession = Depends(get_db)):
    """Get a specific site setting by key."""
    result = await db.execute(select(SiteSetting).where(SiteSetting.key == key))
    setting = result.scalar_one_or_none()
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting
