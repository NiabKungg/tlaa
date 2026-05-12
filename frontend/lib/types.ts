/**
 * Shared TypeScript types matching the backend Pydantic schemas.
 */

export interface PageContent {
  id: number;
  page_name: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  order: number;
  is_active: boolean;
  metadata_json: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: number;
  label: string;
  url: string;
  parent_id: number | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string | null;
  value_type: string;
  created_at: string;
  updated_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_superadmin: boolean;
}
