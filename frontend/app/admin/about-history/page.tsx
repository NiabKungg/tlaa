"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/lib/admin-api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface PageSection {
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
  metadata_json: any;
}

async function apiFetch<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api/admin${path}`, {
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

/** Section definitions for about-history */
const PAGE_SECTIONS = [
  { key: "hero", label: "🎯 Hero Banner", desc: "หัวข้อและคำบรรยายหลักของหน้า" },
  { key: "intro", label: "📜 เนื้อหาแนะนำ", desc: "ประวัติความเป็นมาของสมาคม" },
  { key: "milestone", label: "📅 เหตุการณ์สำคัญ", desc: "Timeline เหตุการณ์ (รูปแบบ: ปี - รายละเอียด)" },
  { key: "image-1", label: "🖼️ รูปภาพประกอบ", desc: "รูปภาพหลักพร้อมคำอธิบาย" },
];

export default function AdminAboutHistoryPage() {
  const router = useRouter();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [formData, setFormData] = useState<Partial<PageSection>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return "";
    }
    return token;
  }, [router]);

  const loadSections = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;
      const data = await apiFetch<PageSection[]>("/pages/about-history", token);
      setSections(data);
    } catch (err) {
      console.error("Failed to load sections:", err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const findSection = (key: string) => sections.find((s) => s.section_key === key);

  const openEditor = (sectionDef: typeof PAGE_SECTIONS[0]) => {
    const existing = findSection(sectionDef.key);
    if (existing) {
      setEditingSection(existing);
      setFormData({ ...existing });
    } else {
      setEditingSection(null);
      setFormData({
        page_name: "about-history",
        section_key: sectionDef.key,
        title: "",
        subtitle: "",
        body: "",
        image_url: "",
        link_url: "",
        link_text: "",
        order: PAGE_SECTIONS.findIndex((s) => s.key === sectionDef.key),
        is_active: true,
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      if (!token) return;

      if (editingSection) {
        // Update
        await apiFetch(`/pages/${editingSection.id}`, token, {
          method: "PUT",
          body: JSON.stringify({
            title: formData.title || null,
            subtitle: formData.subtitle || null,
            body: formData.body || null,
            image_url: formData.image_url || null,
            link_url: formData.link_url || null,
            link_text: formData.link_text || null,
            order: formData.order ?? 0,
            is_active: formData.is_active ?? true,
          }),
        });
      } else {
        // Create
        await apiFetch("/pages", token, {
          method: "POST",
          body: JSON.stringify(formData),
        });
      }

      setEditingSection(null);
      setFormData({});
      await loadSections();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("ยืนยันการลบ?")) return;
    try {
      const token = getToken();
      if (!token) return;
      await apiFetch(`/pages/${id}`, token, { method: "DELETE" });
      await loadSections();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = getToken();
    if (!token) return;

    setUploading(true);
    try {
      const result = await uploadFile(file, token);
      setFormData((prev) => ({ ...prev, image_url: result.url }));
    } catch (err: any) {
      alert("อัปโหลดไม่สำเร็จ: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const isEditing = editingSection !== null || (formData.section_key != null);

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h1 className="admin-page-title">📜 จัดการหน้าประวัติสมาคม</h1>
          <p className="admin-page-desc">จัดการเนื้อหาทุกส่วนของหน้าประวัติสมาคม (About History)</p>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">กำลังโหลด...</div>
      ) : !isEditing ? (
        /* ── Section Cards ── */
        <div className="admin-dashboard__grid">
          {PAGE_SECTIONS.map((sec) => {
            const existing = findSection(sec.key);
            return (
              <div
                key={sec.key}
                className="admin-dashboard__card"
                style={{ cursor: "pointer" }}
                onClick={() => openEditor(sec)}
              >
                <span className="admin-dashboard__card-icon">{sec.label.split(" ")[0]}</span>
                <h3 className="admin-dashboard__card-title">{sec.label.substring(2).trim()}</h3>
                <p className="admin-dashboard__card-desc">{sec.desc}</p>
                <div style={{ marginTop: ".5rem" }}>
                  {existing ? (
                    <span className={`admin-badge ${existing.is_active ? "admin-badge--active" : "admin-badge--inactive"}`}>
                      {existing.is_active ? "✅ มีเนื้อหา" : "⚠️ ซ่อนอยู่"}
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge--inactive">❌ ยังไม่มีเนื้อหา</span>
                  )}
                </div>
                <span className="admin-dashboard__card-arrow">→</span>
              </div>
            );
          })}

          {/* Extra sections from DB */}
          {sections
            .filter((s) => !PAGE_SECTIONS.find((ps) => ps.key === s.section_key))
            .map((s) => (
              <div
                key={s.id}
                className="admin-dashboard__card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditingSection(s);
                  setFormData({ ...s });
                }}
              >
                <span className="admin-dashboard__card-icon">📄</span>
                <h3 className="admin-dashboard__card-title">{s.title || s.section_key}</h3>
                <p className="admin-dashboard__card-desc">Section เพิ่มเติม</p>
                <span className="admin-dashboard__card-arrow">→</span>
              </div>
            ))}

          {/* Add extra section */}
          <div
            className="admin-dashboard__card"
            style={{ cursor: "pointer", borderStyle: "dashed" }}
            onClick={() => {
              setEditingSection(null);
              setFormData({
                page_name: "about-history",
                section_key: `extra-${Date.now()}`,
                title: "",
                subtitle: "",
                body: "",
                image_url: "",
                order: sections.length,
                is_active: true,
              });
            }}
          >
            <span className="admin-dashboard__card-icon" style={{ fontSize: "2rem" }}>+</span>
            <h3 className="admin-dashboard__card-title">เพิ่ม Section ใหม่</h3>
            <p className="admin-dashboard__card-desc">เพิ่มเนื้อหาส่วนใหม่ในหน้าประวัติสมาคม</p>
          </div>
        </div>
      ) : (
        /* ── Editor ── */
        <div style={{ maxWidth: "800px" }}>
          <button
            className="admin-btn"
            onClick={() => {
              setEditingSection(null);
              setFormData({});
            }}
            style={{ marginBottom: "1rem" }}
          >
            ← กลับ
          </button>

          <div className="admin-modal" style={{ position: "static", maxWidth: "100%", width: "100%" }}>
            <div className="admin-modal__header">
              <h2>
                {editingSection ? "แก้ไข" : "เพิ่ม"} Section: {formData.section_key}
              </h2>
            </div>

            <div className="admin-modal__body">
              {/* Section Key */}
              <div className="admin-form-group">
                <label>Section Key <span className="required">*</span></label>
                <input
                  type="text"
                  value={formData.section_key || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, section_key: e.target.value }))}
                  placeholder="e.g. hero, intro, milestone"
                  disabled={!!editingSection}
                />
              </div>

              {/* Title */}
              <div className="admin-form-group">
                <label>หัวข้อ (Title)</label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="หัวข้อหลัก"
                />
              </div>

              {/* Subtitle */}
              <div className="admin-form-group">
                <label>คำบรรยายย่อย (Subtitle)</label>
                <input
                  type="text"
                  value={formData.subtitle || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="คำบรรยายเสริม"
                />
              </div>

              {/* Body */}
              <div className="admin-form-group">
                <label>เนื้อหา (Body)</label>
                <textarea
                  value={formData.body || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                  placeholder="เนื้อหาหลัก (ขึ้นบรรทัดใหม่ = ย่อหน้าใหม่)"
                  rows={8}
                />
              </div>

              {/* Image */}
              <div className="admin-form-group">
                <label>รูปภาพ</label>
                {formData.image_url && (
                  <div className="admin-image-preview">
                    <img src={formData.image_url} alt="Preview" />
                    <button
                      type="button"
                      className="admin-image-preview__remove"
                      onClick={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <div className="admin-image-upload">
                  <label className="admin-btn admin-btn--sm">
                    {uploading ? "⏳ กำลังอัปโหลด..." : "📁 เลือกรูปจากคอมพิวเตอร์"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      style={{ display: "none" }}
                    />
                  </label>
                  <span className="admin-image-upload__or">หรือ</span>
                  <input
                    type="url"
                    value={formData.image_url || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                    placeholder="วาง URL รูปภาพ"
                    className="admin-image-upload__url"
                  />
                </div>
              </div>

              {/* Order */}
              <div className="admin-form-group">
                <label>ลำดับ</label>
                <input
                  type="number"
                  value={formData.order ?? 0}
                  onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                />
              </div>

              {/* Active Toggle */}
              <div className="admin-form-group admin-form-group--toggle">
                <label>แสดงผล</label>
                <button
                  type="button"
                  className={`admin-toggle ${formData.is_active ? "active" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, is_active: !prev.is_active }))}
                >
                  <span className="admin-toggle__thumb" />
                </button>
              </div>
            </div>

            <div className="admin-modal__footer">
              {editingSection && (
                <button
                  className="admin-btn admin-btn--danger"
                  onClick={() => {
                    handleDelete(editingSection.id);
                    setEditingSection(null);
                    setFormData({});
                  }}
                >
                  🗑️ ลบ
                </button>
              )}
              <div style={{ flex: 1 }} />
              <button
                className="admin-btn"
                onClick={() => {
                  setEditingSection(null);
                  setFormData({});
                }}
              >
                ยกเลิก
              </button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? "กำลังบันทึก..." : "💾 บันทึก"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
