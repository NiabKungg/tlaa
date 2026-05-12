"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminFetch, SECTIONS, type SectionConfig, type FieldDef } from "@/lib/admin-api";

export default function AdminSectionPage() {
  const params = useParams();
  const router = useRouter();
  const sectionKey = params.section as string;
  const section = SECTIONS.find((s) => s.key === sectionKey);

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return "";
    }
    return token;
  }, [router]);

  const loadItems = useCallback(async () => {
    if (!section) return;
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;
      const data = await adminFetch<any[]>(section.apiPath, token);
      setItems(data);
    } catch (err) {
      console.error("Failed to load items:", err);
    } finally {
      setLoading(false);
    }
  }, [section, getToken]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  if (!section) {
    return <div className="admin-page-title">Section not found</div>;
  }

  const openCreate = () => {
    setEditingItem(null);
    const defaults: Record<string, any> = {};
    section.fields.forEach((f) => {
      if (f.type === "toggle") defaults[f.key] = true;
      else if (f.type === "number") defaults[f.key] = 0;
      else defaults[f.key] = "";
    });
    setFormData(defaults);
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditingItem(item);
    const data: Record<string, any> = {};
    section.fields.forEach((f) => {
      data[f.key] = item[f.key] ?? (f.type === "toggle" ? true : f.type === "number" ? 0 : "");
    });
    setFormData(data);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      if (!token) return;

      // Clean data
      const body: Record<string, any> = {};
      section.fields.forEach((f) => {
        let val = formData[f.key];
        if (f.type === "number") val = Number(val) || 0;
        if (f.type === "toggle") val = Boolean(val);
        if (val === "") val = f.type === "text" || f.type === "textarea" || f.type === "url" ? null : val;
        body[f.key] = val;
      });

      if (editingItem) {
        await adminFetch(
          `${section.apiPath}/${editingItem.id}`,
          token,
          { method: "PUT", body: JSON.stringify(body) }
        );
      } else {
        await adminFetch(
          section.apiPath,
          token,
          { method: "POST", body: JSON.stringify(body) }
        );
      }

      setModalOpen(false);
      await loadItems();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = getToken();
      if (!token) return;
      await adminFetch(`${section.apiPath}/${id}`, token, { method: "DELETE" });
      setDeleteConfirm(null);
      await loadItems();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="admin-section">
      {/* Header */}
      <div className="admin-section__header">
        <div>
          <h1 className="admin-page-title">
            {section.icon} {section.label}
          </h1>
          <p className="admin-page-desc">จัดการข้อมูล {section.label} ทั้งหมด</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openCreate}>
          + เพิ่มรายการ
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">กำลังโหลด...</div>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <p>ยังไม่มีข้อมูล</p>
          <button className="admin-btn admin-btn--primary" onClick={openCreate}>
            + เพิ่มรายการแรก
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{section.fields.find((f) => f.key === section.titleField)?.label || "Title"}</th>
                <th>ลำดับ</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="admin-table__title">
                    {String(item[section.titleField] || "—").substring(0, 60)}
                  </td>
                  <td>{item.order}</td>
                  <td>
                    <span className={`admin-badge ${item.is_active ? "admin-badge--active" : "admin-badge--inactive"}`}>
                      {item.is_active ? "แสดง" : "ซ่อน"}
                    </span>
                  </td>
                  <td className="admin-table__actions">
                    <button className="admin-btn admin-btn--sm" onClick={() => openEdit(item)}>
                      ✏️ แก้ไข
                    </button>
                    {deleteConfirm === item.id ? (
                      <>
                        <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(item.id)}>
                          ยืนยันลบ
                        </button>
                        <button className="admin-btn admin-btn--sm" onClick={() => setDeleteConfirm(null)}>
                          ยกเลิก
                        </button>
                      </>
                    ) : (
                      <button className="admin-btn admin-btn--sm admin-btn--danger-outline" onClick={() => setDeleteConfirm(item.id)}>
                        🗑️ ลบ
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>{editingItem ? "แก้ไข" : "เพิ่ม"} {section.label}</h2>
              <button className="admin-modal__close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="admin-modal__body">
              {section.fields.map((field) => (
                <FieldInput
                  key={field.key}
                  field={field}
                  value={formData[field.key]}
                  onChange={(val) => updateField(field.key, val)}
                />
              ))}
            </div>

            <div className="admin-modal__footer">
              <button className="admin-btn" onClick={() => setModalOpen(false)}>ยกเลิก</button>
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

/** Render the correct input based on field type */
function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: any;
  onChange: (val: any) => void;
}) {
  if (field.type === "toggle") {
    return (
      <div className="admin-form-group admin-form-group--toggle">
        <label>{field.label}</label>
        <button
          type="button"
          className={`admin-toggle ${value ? "active" : ""}`}
          onClick={() => onChange(!value)}
        >
          <span className="admin-toggle__thumb" />
        </button>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="admin-form-group">
        <label>{field.label} {field.required && <span className="required">*</span>}</label>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || field.label}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div className="admin-form-group">
      <label>{field.label} {field.required && <span className="required">*</span>}</label>
      <input
        type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
        value={value ?? ""}
        onChange={(e) => onChange(field.type === "number" ? e.target.value : e.target.value)}
        placeholder={field.placeholder || field.label}
        required={field.required}
      />
    </div>
  );
}
