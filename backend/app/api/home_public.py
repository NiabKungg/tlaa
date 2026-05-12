"""
Public API endpoints for Home Page – no authentication required.
"""
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.models.home import (
    HeroSlide, TextSlide, ContentCard, VideoItem,
    StatItem, LogoItem, CarouselCard, FeatureCard, FooterContent,
)
from app.schemas.home import (
    HeroSlideResponse, TextSlideResponse, ContentCardResponse, VideoItemResponse,
    StatItemResponse, LogoItemResponse, CarouselCardResponse, FeatureCardResponse,
    FooterContentResponse,
)

router = APIRouter()


@router.get("/hero-slides", response_model=List[HeroSlideResponse])
async def get_hero_slides(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(HeroSlide).where(HeroSlide.is_active == True).order_by(HeroSlide.order)
    )
    return result.scalars().all()


@router.get("/text-slides", response_model=List[TextSlideResponse])
async def get_text_slides(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(TextSlide).where(TextSlide.is_active == True).order_by(TextSlide.order)
    )
    return result.scalars().all()


@router.get("/content-cards", response_model=List[ContentCardResponse])
async def get_content_cards(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ContentCard).where(ContentCard.is_active == True).order_by(ContentCard.order)
    )
    return result.scalars().all()


@router.get("/videos", response_model=List[VideoItemResponse])
async def get_videos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(VideoItem).where(VideoItem.is_active == True).order_by(VideoItem.order)
    )
    return result.scalars().all()


@router.get("/stats", response_model=List[StatItemResponse])
async def get_stats(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(StatItem).where(StatItem.is_active == True).order_by(StatItem.order)
    )
    return result.scalars().all()


@router.get("/logos", response_model=List[LogoItemResponse])
async def get_logos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(LogoItem).where(LogoItem.is_active == True).order_by(LogoItem.order)
    )
    return result.scalars().all()


@router.get("/carousel-cards", response_model=List[CarouselCardResponse])
async def get_carousel_cards(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CarouselCard).where(CarouselCard.is_active == True).order_by(CarouselCard.order)
    )
    return result.scalars().all()


@router.get("/feature-cards", response_model=List[FeatureCardResponse])
async def get_feature_cards(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(FeatureCard).where(FeatureCard.is_active == True).order_by(FeatureCard.order)
    )
    return result.scalars().all()


@router.get("/footer", response_model=List[FooterContentResponse])
async def get_footer(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(FooterContent).where(FooterContent.is_active == True).order_by(FooterContent.order)
    )
    return result.scalars().all()
