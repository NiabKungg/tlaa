"""
Home Page specific models – each model supports CMS CRUD.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class HeroSlide(Base):
    """
    Image Slider (Hero Banner).
    Recommended image ratio: 20:7 (7929×2779 px).
    """
    __tablename__ = "hero_slides"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=True)
    subtitle = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=False)
    link_url = Column(String(500), nullable=True)
    link_text = Column(String(200), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class TextSlide(Base):
    """
    Text Slider below the hero banner.
    Auto-rotating text messages.
    """
    __tablename__ = "text_slides"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class ContentCard(Base):
    """
    Content Cards / Grid – news, announcements, articles.
    """
    __tablename__ = "content_cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    link_url = Column(String(500), nullable=True)
    category = Column(String(100), nullable=True)       # e.g. "ข่าวสมาคม", "ข่าวประชาสัมพันธ์"
    date_text = Column(String(100), nullable=True)       # Display date text
    view_count = Column(Integer, default=0)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class VideoItem(Base):
    """
    Video Player Slider – YouTube embed links.
    """
    __tablename__ = "video_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    youtube_url = Column(String(500), nullable=False)    # Full YouTube URL
    thumbnail_url = Column(String(500), nullable=True)   # Custom thumbnail (optional)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class StatItem(Base):
    """
    Stats / Info section – statistics display.
    e.g. "ปัจจุบัน สมาคมประกันชีวิตไทย มีสมาชิกบริษัททั้งสิ้น 22 บริษัท"
    """
    __tablename__ = "stat_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)
    stat_number = Column(String(50), nullable=True)      # e.g. "22"
    stat_label = Column(String(200), nullable=True)       # e.g. "บริษัท"
    icon_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class LogoItem(Base):
    """
    Logo Grid – member/partner company logos.
    """
    __tablename__ = "logo_items"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(300), nullable=False)
    logo_url = Column(String(500), nullable=False)
    website_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class CarouselCard(Base):
    """
    Card Carousel – horizontal scrollable document/image cards.
    """
    __tablename__ = "carousel_cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=True)
    image_url = Column(String(500), nullable=False)
    link_url = Column(String(500), nullable=True)
    category = Column(String(100), nullable=True)        # e.g. "เอกสาร", "การเผยแพร่ความรู้"
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class FeatureCard(Base):
    """
    Feature Cards – 4 shortcut blocks with images.
    Quick access to popular services.
    """
    __tablename__ = "feature_cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=False)
    link_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class FooterContent(Base):
    """
    Footer CMS – editable footer sections.
    section_key examples: 'address', 'contact', 'social_links', 'copyright'
    """
    __tablename__ = "footer_contents"

    id = Column(Integer, primary_key=True, index=True)
    section_key = Column(String(100), nullable=False, index=True)
    title = Column(String(300), nullable=True)
    body = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    link_url = Column(String(500), nullable=True)
    link_text = Column(String(200), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
