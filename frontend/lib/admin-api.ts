/**
 * Admin API utilities — wraps fetchAdmin with section-specific CRUD helpers.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function adminFetch<T>(
  path: string,
  token: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}/api/admin/home${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (res.status === 204) return undefined as unknown as T;
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json();
}

export async function adminLogin(
  email: string,
  password: string
): Promise<{ access_token: string }> {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  if (!res.ok) throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  return res.json();
}

/** Section config — field definitions for the dynamic CRUD UI */
export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "toggle" | "select";
  required?: boolean;
  options?: string[];     // for select type
  placeholder?: string;
}

export interface SectionConfig {
  key: string;
  label: string;
  icon: string;
  apiPath: string;
  fields: FieldDef[];
  titleField: string;      // which field to show as row title
}

export const SECTIONS: SectionConfig[] = [
  {
    key: "hero-slides",
    label: "Hero Slides",
    icon: "🖼️",
    apiPath: "/hero-slides",
    titleField: "title",
    fields: [
      { key: "title", label: "หัวข้อ", type: "text" },
      { key: "subtitle", label: "คำบรรยาย", type: "textarea" },
      { key: "image_url", label: "URL รูปภาพ (20:7)", type: "url" },
      { key: "link_url", label: "ลิงก์", type: "url" },
      { key: "link_text", label: "ข้อความปุ่ม", type: "text" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "text-slides",
    label: "Text Slides",
    icon: "💬",
    apiPath: "/text-slides",
    titleField: "text",
    fields: [
      { key: "text", label: "ข้อความ", type: "textarea", required: true },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "content-cards",
    label: "Content Cards",
    icon: "📰",
    apiPath: "/content-cards",
    titleField: "title",
    fields: [
      { key: "title", label: "หัวข้อ", type: "text", required: true },
      { key: "description", label: "รายละเอียด", type: "textarea" },
      { key: "image_url", label: "URL รูปภาพ", type: "url" },
      { key: "link_url", label: "ลิงก์", type: "url" },
      { key: "category", label: "หมวดหมู่", type: "text" },
      { key: "date_text", label: "วันที่แสดง", type: "text" },
      { key: "view_count", label: "จำนวนเข้าชม", type: "number" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "videos",
    label: "Videos",
    icon: "🎬",
    apiPath: "/videos",
    titleField: "title",
    fields: [
      { key: "title", label: "ชื่อวิดีโอ", type: "text", required: true },
      { key: "youtube_url", label: "YouTube URL", type: "url", required: true },
      { key: "thumbnail_url", label: "URL ภาพปก", type: "url" },
      { key: "description", label: "รายละเอียด", type: "textarea" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "stats",
    label: "Stats / Info",
    icon: "📊",
    apiPath: "/stats",
    titleField: "title",
    fields: [
      { key: "title", label: "หัวข้อ", type: "text", required: true },
      { key: "description", label: "รายละเอียด", type: "textarea" },
      { key: "stat_number", label: "ตัวเลข", type: "text" },
      { key: "stat_label", label: "คำอธิบายตัวเลข", type: "text" },
      { key: "icon_url", label: "URL ไอคอน", type: "url" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "logos",
    label: "Logos",
    icon: "🏢",
    apiPath: "/logos",
    titleField: "company_name",
    fields: [
      { key: "company_name", label: "ชื่อบริษัท", type: "text", required: true },
      { key: "logo_url", label: "URL โลโก้", type: "url", required: true },
      { key: "website_url", label: "เว็บไซต์", type: "url" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "carousel-cards",
    label: "Card Carousel",
    icon: "📄",
    apiPath: "/carousel-cards",
    titleField: "title",
    fields: [
      { key: "title", label: "หัวข้อ", type: "text" },
      { key: "image_url", label: "URL รูปภาพ", type: "url", required: true },
      { key: "link_url", label: "ลิงก์", type: "url" },
      { key: "category", label: "หมวดหมู่", type: "text" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "feature-cards",
    label: "Feature Cards",
    icon: "⚡",
    apiPath: "/feature-cards",
    titleField: "title",
    fields: [
      { key: "title", label: "หัวข้อ", type: "text", required: true },
      { key: "description", label: "รายละเอียด", type: "textarea" },
      { key: "image_url", label: "URL รูปภาพ", type: "url", required: true },
      { key: "link_url", label: "ลิงก์", type: "url" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    icon: "📋",
    apiPath: "/footer",
    titleField: "section_key",
    fields: [
      { key: "section_key", label: "Key (address/contact/social/quick_links)", type: "text", required: true },
      { key: "title", label: "หัวข้อ", type: "text" },
      { key: "body", label: "เนื้อหา", type: "textarea" },
      { key: "image_url", label: "URL รูปภาพ", type: "url" },
      { key: "link_url", label: "ลิงก์", type: "url" },
      { key: "link_text", label: "ข้อความลิงก์", type: "text" },
      { key: "order", label: "ลำดับ", type: "number", required: true },
      { key: "is_active", label: "แสดงผล", type: "toggle" },
    ],
  },
];
