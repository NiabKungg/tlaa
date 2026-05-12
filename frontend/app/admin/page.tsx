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
    </div>
  );
}
