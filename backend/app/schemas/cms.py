"""
Pydantic schemas for CMS content.
"""
from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime


# ── PageContent ──
class PageContentBase(BaseModel):
    page_name: str
    section_key: str
    title: Optional[str] = None
    subtitle: Optional[str] = None
    body: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: int = 0
    is_active: bool = True
    metadata_json: Optional[Any] = None


class PageContentCreate(PageContentBase):
    pass


class PageContentUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    body: Optional[str] = None
    image_url: Optional[str] = None
    link_url: Optional[str] = None
    link_text: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None
    metadata_json: Optional[Any] = None


class PageContentResponse(PageContentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ── MenuItem ──
class MenuItemBase(BaseModel):
    label: str
    url: str
    parent_id: Optional[int] = None
    order: int = 0
    is_active: bool = True


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    label: Optional[str] = None
    url: Optional[str] = None
    parent_id: Optional[int] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class MenuItemResponse(MenuItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ── SiteSetting ──
class SiteSettingBase(BaseModel):
    key: str
    value: Optional[str] = None
    value_type: str = "text"


class SiteSettingCreate(SiteSettingBase):
    pass


class SiteSettingUpdate(BaseModel):
    value: Optional[str] = None
    value_type: Optional[str] = None


class SiteSettingResponse(SiteSettingBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
