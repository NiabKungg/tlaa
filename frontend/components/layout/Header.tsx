"use client";

import { useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";

/* ── Default menu items matching the screenshot ── */
const DEFAULT_MENU: { label: string; url: string; children?: { label: string; url: string }[] }[] = [
  {
    label: "บริการข้อมูลธุรกิจ",
    url: "#",
    children: [
      { label: "สถิติธุรกิจประกันชีวิต", url: "/statistics" },
      { label: "รายงานประจำปี", url: "/annual-report" },
      { label: "ข้อมูลบริษัทสมาชิก", url: "/members" },
    ],
  },
  {
    label: "อบรมสัมมนา/ขอรับเหตุผลประกันชีวิต",
    url: "#",
    children: [
      { label: "ตารางอบรม-สัมมนา", url: "/training" },
      { label: "ลงทะเบียนอบรม", url: "/register-training" },
    ],
  },
  {
    label: "ตรวจสอบรายชื่อผู้มีสิทธิ์สอบ/อบรม",
    url: "/check-eligibility",
  },
];

const HIGHLIGHT_LINKS = [
  { label: "สอบใบอนุญาตตัวแทนประกันชีวิต", url: "/exam-registration" },
  { label: "สถิติธุรกิจสอบ", url: "/exam-statistics" },
  { label: "ติดต่อสมาคม", url: "/contact" },
];

interface Props {
  menuItems?: MenuItem[];
}

export default function Header({ menuItems }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header id="site-header" className="site-header">
      <div className="site-header__inner">
        {/* ── Logo ── */}
        <Link href="/" className="site-header__logo">
          <img
            src="/logo2024_mobile.png"
            alt="สมาคมประกันชีวิตไทย"
            className="site-header__logo-img"
          />
          <div className="site-header__logo-text">
            <span className="site-header__logo-th">สมาคมประกันชีวิตไทย</span>
            <span className="site-header__logo-en">The Thai Life Assurance Association</span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="site-header__nav">
          {DEFAULT_MENU.map((item, i) => (
            <div
              key={i}
              className="site-header__nav-item"
              onMouseEnter={() => item.children && setActiveDropdown(i)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={item.url} className="site-header__nav-link">
                {item.label}
                {item.children && (
                  <svg className="site-header__nav-arrow" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              {item.children && activeDropdown === i && (
                <div className="site-header__dropdown">
                  {item.children.map((child, j) => (
                    <Link key={j} href={child.url} className="site-header__dropdown-link">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ── Highlight buttons (right side) ── */}
        <div className="site-header__actions">
          {HIGHLIGHT_LINKS.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              className={`site-header__action-btn ${i === 0 ? "site-header__action-btn--accent" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Mobile toggle ── */}
        <button
          className="site-header__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="site-header__mobile-menu">
          {DEFAULT_MENU.map((item, i) => (
            <div key={i} className="site-header__mobile-group">
              {item.children ? (
                <>
                  <button
                    className="site-header__mobile-link site-header__mobile-link--parent"
                    onClick={() => toggleDropdown(i)}
                  >
                    {item.label}
                    <svg
                      className={`site-header__mobile-arrow ${activeDropdown === i ? "open" : ""}`}
                      width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </button>
                  {activeDropdown === i && (
                    <div className="site-header__mobile-sub">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.url}
                          className="site-header__mobile-link site-header__mobile-link--child"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.url}
                  className="site-header__mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="site-header__mobile-actions">
            {HIGHLIGHT_LINKS.map((link, i) => (
              <Link
                key={i}
                href={link.url}
                className="site-header__mobile-action-btn"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
