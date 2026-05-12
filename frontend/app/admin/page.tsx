"use client";

import Link from "next/link";
import { SECTIONS } from "@/lib/admin-api";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-desc">
        จัดการเนื้อหาทุกส่วนของหน้าแรก (Home Page) ผ่าน CMS ได้ที่นี่
      </p>

      <div className="admin-dashboard__grid">
        {SECTIONS.map((section) => (
          <Link
            key={section.key}
            href={`/admin/${section.key}`}
            className="admin-dashboard__card"
          >
            <span className="admin-dashboard__card-icon">{section.icon}</span>
            <h3 className="admin-dashboard__card-title">{section.label}</h3>
            <p className="admin-dashboard__card-desc">
              จัดการ {section.fields.length} ฟิลด์
            </p>
            <span className="admin-dashboard__card-arrow">→</span>
          </Link>
        ))}
      </div>

      <h2 style={{ margin: "2rem 0 1rem", fontSize: "1.1rem", color: "#1e293b" }}>📄 จัดการเนื้อหาหน้าอื่นๆ</h2>
      <div className="admin-dashboard__grid">
        <Link
          href="/admin/about-history"
          className="admin-dashboard__card"
        >
          <span className="admin-dashboard__card-icon">📜</span>
          <h3 className="admin-dashboard__card-title">ประวัติสมาคม</h3>
          <p className="admin-dashboard__card-desc">
            จัดการเนื้อหาหน้าประวัติสมาคม (About History)
          </p>
          <span className="admin-dashboard__card-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
