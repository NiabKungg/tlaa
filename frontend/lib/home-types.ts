/**
 * TypeScript types for Home Page CMS sections.
 */

export interface HeroSlide {
  id: number;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  link_text: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TextSlide {
  id: number;
  text: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentCard {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  category: string | null;
  date_text: string | null;
  view_count: number;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VideoItem {
  id: number;
  title: string;
  youtube_url: string;
  thumbnail_url: string | null;
  description: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatItem {
  id: number;
  title: string;
  description: string | null;
  stat_number: string | null;
  stat_label: string | null;
  icon_url: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LogoItem {
  id: number;
  company_name: string;
  logo_url: string;
  website_url: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CarouselCard {
  id: number;
  title: string | null;
  image_url: string;
  link_url: string | null;
  category: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeatureCard {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  link_url: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FooterContent {
  id: number;
  section_key: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
