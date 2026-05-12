"""
Admin CMS API for Home Page – JWT authentication required.
Generic CRUD factory to avoid repetition across 9 models.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.user import User
from app.models.home import (
    HeroSlide, TextSlide, ContentCard, VideoItem,
    StatItem, LogoItem, CarouselCard, FeatureCard, FooterContent,
)
from app.schemas.home import (
    HeroSlideCreate, HeroSlideUpdate, HeroSlideResponse,
    TextSlideCreate, TextSlideUpdate, TextSlideResponse,
    ContentCardCreate, ContentCardUpdate, ContentCardResponse,
    VideoItemCreate, VideoItemUpdate, VideoItemResponse,
    StatItemCreate, StatItemUpdate, StatItemResponse,
    LogoItemCreate, LogoItemUpdate, LogoItemResponse,
    CarouselCardCreate, CarouselCardUpdate, CarouselCardResponse,
    FeatureCardCreate, FeatureCardUpdate, FeatureCardResponse,
    FooterContentCreate, FooterContentUpdate, FooterContentResponse,
)

router = APIRouter()


def _register_crud(prefix, Model, CreateSchema, UpdateSchema, ResponseSchema):
    """Register standard CRUD endpoints for a model."""

    @router.get(f"/{prefix}", response_model=List[ResponseSchema], name=f"admin_list_{prefix}")
    async def list_items(
        db: AsyncSession = Depends(get_db),
        _admin: User = Depends(get_current_admin),
    ):
        result = await db.execute(select(Model).order_by(Model.order))
        return result.scalars().all()

    @router.post(f"/{prefix}", response_model=ResponseSchema, status_code=201, name=f"admin_create_{prefix}")
    async def create_item(
        data: CreateSchema,
        db: AsyncSession = Depends(get_db),
        _admin: User = Depends(get_current_admin),
    ):
        item = Model(**data.model_dump())
        db.add(item)
        await db.flush()
        await db.refresh(item)
        return item

    @router.put(f"/{prefix}/{{item_id}}", response_model=ResponseSchema, name=f"admin_update_{prefix}")
    async def update_item(
        item_id: int,
        data: UpdateSchema,
        db: AsyncSession = Depends(get_db),
        _admin: User = Depends(get_current_admin),
    ):
        result = await db.execute(select(Model).where(Model.id == item_id))
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail=f"{prefix} item not found")
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(item, field, value)
        await db.flush()
        await db.refresh(item)
        return item

    @router.delete(f"/{prefix}/{{item_id}}", status_code=204, name=f"admin_delete_{prefix}")
    async def delete_item(
        item_id: int,
        db: AsyncSession = Depends(get_db),
        _admin: User = Depends(get_current_admin),
    ):
        result = await db.execute(select(Model).where(Model.id == item_id))
        item = result.scalar_one_or_none()
        if not item:
            raise HTTPException(status_code=404, detail=f"{prefix} item not found")
        await db.delete(item)


# Register CRUD for all home page models
_register_crud("hero-slides", HeroSlide, HeroSlideCreate, HeroSlideUpdate, HeroSlideResponse)
_register_crud("text-slides", TextSlide, TextSlideCreate, TextSlideUpdate, TextSlideResponse)
_register_crud("content-cards", ContentCard, ContentCardCreate, ContentCardUpdate, ContentCardResponse)
_register_crud("videos", VideoItem, VideoItemCreate, VideoItemUpdate, VideoItemResponse)
_register_crud("stats", StatItem, StatItemCreate, StatItemUpdate, StatItemResponse)
_register_crud("logos", LogoItem, LogoItemCreate, LogoItemUpdate, LogoItemResponse)
_register_crud("carousel-cards", CarouselCard, CarouselCardCreate, CarouselCardUpdate, CarouselCardResponse)
_register_crud("feature-cards", FeatureCard, FeatureCardCreate, FeatureCardUpdate, FeatureCardResponse)
_register_crud("footer", FooterContent, FooterContentCreate, FooterContentUpdate, FooterContentResponse)
