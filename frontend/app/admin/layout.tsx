"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { SECTIONS } from "@/lib/admin-api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check auth on mount
  useEffect(() => {
    if (pathname === "/admin/login") return;
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // Don't render layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="admin-sidebar__header">
          <Link href="/admin" className="admin-sidebar__brand">
            <img src="/logo2024_mobile.png" alt="TLAA" className="admin-sidebar__logo" />
            {sidebarOpen && <span>CMS Admin</span>}
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          <Link
            href="/admin"
            className={`admin-sidebar__link ${pathname === "/admin" ? "active" : ""}`}
          >
            <span className="admin-sidebar__icon">🏠</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <div className="admin-sidebar__divider" />
          {sidebarOpen && <p className="admin-sidebar__section-label">Home Page Sections</p>}

          {SECTIONS.map((section) => (
            <Link
              key={section.key}
              href={`/admin/${section.key}`}
              className={`admin-sidebar__link ${pathname === `/admin/${section.key}` ? "active" : ""}`}
            >
              <span className="admin-sidebar__icon">{section.icon}</span>
              {sidebarOpen && <span>{section.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <Link href="/" className="admin-sidebar__link" target="_blank">
            <span className="admin-sidebar__icon">🌐</span>
            {sidebarOpen && <span>ดูเว็บไซต์</span>}
          </Link>
          <button onClick={handleLogout} className="admin-sidebar__link admin-sidebar__link--danger">
            <span className="admin-sidebar__icon">🚪</span>
            {sidebarOpen && <span>ออกจากระบบ</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <button
            className="admin-topbar__toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h2 className="admin-topbar__title">Content Management System</h2>
        </header>

        {/* Page content */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
