"""
Pydantic schemas for Home Page CMS sections.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ═══════════════════════════════════════════
# HeroSlide
# ═══════════════════════════════════════════

class HeroSlideBase(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image_url: str
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: int = 0
    is_active: bool = True


class HeroSlideCreate(HeroSlideBase):
    pass


class HeroSlideUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class HeroSlideResponse(HeroSlideBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# TextSlide
# ═══════════════════════════════════════════

class TextSlideBase(BaseModel):
    text: str
    order: int = 0
    is_active: bool = True


class TextSlideCreate(TextSlideBase):
    pass


class TextSlideUpdate(BaseModel):
    text: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class TextSlideResponse(TextSlideBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# ContentCard
# ═══════════════════════════════════════════

class ContentCardBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    category: Optional[str] = None
    date_text: Optional[str] = None
    view_count: int = 0
    order: int = 0
    is_active: bool = True


class ContentCardCreate(ContentCardBase):
    pass


class ContentCardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    category: Optional[str] = None
    date_text: Optional[str] = None
    view_count: Optional[int] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class ContentCardResponse(ContentCardBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# VideoItem
# ═══════════════════════════════════════════

class VideoItemBase(BaseModel):
    title: str
    youtube_url: str
    thumbnail_url: Optional[str] = None
    description: Optional[str] = None
    order: int = 0
    is_active: bool = True


class VideoItemCreate(VideoItemBase):
    pass


class VideoItemUpdate(BaseModel):
    title: Optional[str] = None
    youtube_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class VideoItemResponse(VideoItemBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# StatItem
# ═══════════════════════════════════════════

class StatItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    stat_number: Optional[str] = None
    stat_label: Optional[str] = None
    icon_url: Optional[str] = None
    order: int = 0
    is_active: bool = True


class StatItemCreate(StatItemBase):
    pass


class StatItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    stat_number: Optional[str] = None
    stat_label: Optional[str] = None
    icon_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class StatItemResponse(StatItemBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# LogoItem
# ═══════════════════════════════════════════

class LogoItemBase(BaseModel):
    company_name: str
    logo_url: str
    website_url: Optional[str] = None
    order: int = 0
    is_active: bool = True


class LogoItemCreate(LogoItemBase):
    pass


class LogoItemUpdate(BaseModel):
    company_name: Optional[str] = None
    logo_url: Optional[str] = None
    website_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class LogoItemResponse(LogoItemBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# CarouselCard
# ═══════════════════════════════════════════

class CarouselCardBase(BaseModel):
    title: Optional[str] = None
    image_url: str
    link_url: Optional[str] = None
    category: Optional[str] = None
    order: int = 0
    is_active: bool = True


class CarouselCardCreate(CarouselCardBase):
    pass


class CarouselCardUpdate(BaseModel):
    title: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    category: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class CarouselCardResponse(CarouselCardBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# FeatureCard
# ═══════════════════════════════════════════

class FeatureCardBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: str
    link_url: Optional[str] = None
    order: int = 0
    is_active: bool = True


class FeatureCardCreate(FeatureCardBase):
    pass


class FeatureCardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class FeatureCardResponse(FeatureCardBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}


# ═══════════════════════════════════════════
# FooterContent
# ═══════════════════════════════════════════

class FooterContentBase(BaseModel):
    section_key: str
    title: Optional[str] = None
    body: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: int = 0
    is_active: bool = True


class FooterContentCreate(FooterContentBase):
    pass


class FooterContentUpdate(BaseModel):
    section_key: Optional[str] = None
    title: Optional[str] = None
    body: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class FooterContentResponse(FooterContentBase):
    id: int
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}
