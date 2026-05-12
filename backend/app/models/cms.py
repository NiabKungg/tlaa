"""
CMS Page model – stores dynamic content for every page section.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from sqlalchemy.sql import func

from app.core.database import Base


class PageContent(Base):
    """
    Generic CMS content block.
    Each row represents a section of a page (e.g., hero banner, about text, etc.).
    """
    __tablename__ = "page_contents"

    id = Column(Integer, primary_key=True, index=True)
    page_name = Column(String(100), nullable=False, index=True)   # e.g. "home", "about"
    section_key = Column(String(100), nullable=False, index=True)  # e.g. "hero", "intro"
    title = Column(String(500), nullable=True)
    subtitle = Column(String(500), nullable=True)
    body = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    link_url = Column(String(500), nullable=True)
    link_text = Column(String(200), nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    metadata_json = Column(JSON, nullable=True)  # Flexible extra data
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class MenuItem(Base):
    """Navigation menu items managed via CMS."""
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(200), nullable=False)
    url = Column(String(500), nullable=False)
    parent_id = Column(Integer, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class SiteSetting(Base):
    """Global site settings (logo, site name, footer text, etc.)."""
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(Text, nullable=True)
    value_type = Column(String(50), default="text")  # text, image, json
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
