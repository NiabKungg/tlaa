"use client";

import { useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";

/* ── Navigation matching the official TLAA site ── */
type NavItem = {
  label: string;
  url: string;
  megaMenu?: {
    title: string;
    columns: { label: string; url: string }[][];
    image: string;
    imageTitle: string;
    imageDesc: string;
  };
};

const NAV_MENU: NavItem[] = [
  {
    label: "เกี่ยวกับสมาคมฯ",
    url: "#",
    megaMenu: {
      title: "เกี่ยวกับสมาคม",
      columns: [
        [
          { label: "ประวัติสมาคม", url: "/about/history" },
          { label: "คณะกรรมการบริหาร", url: "/about/board" },
          { label: "คณะอนุกรรมการสมาคม", url: "/about/subcommittee" },
          { label: "กิจกรรมเพื่อสังคม", url: "/about/csr" },
          { label: "วิสัยทัศน์และพันธกิจ", url: "/about/vision" },
          { label: "นโยบายบริหาร", url: "/about/policy" },
        ],
        [
          { label: "แผนภูมิการบริหาร", url: "/about/org-chart" },
          { label: "คณะกรรมการสมาคม", url: "/about/committee" },
          { label: "บริษัทสมาชิก", url: "/members" },
          { label: "บทบาทหน้าที่", url: "/about/roles" },
          { label: "เป้าหมายและจุดประสงค์", url: "/about/goals" },
          { label: "นโยบายคุ้มครองข้อมูลส่วนบุคคล", url: "/about/privacy" },
        ]
      ],
      image: "/a8a95ecf.jpg",
      imageTitle: "เกี่ยวกับสมาคม",
      imageDesc: "ผู้ดำเนินการธุรกิจประกันชีวิตในประเทศไทย ได้ประชุมปรึกษาหารือในการที่ จะจัดตั้งองค์กรกลาง สำหรับธุรกิจประกันชีวิตขึ้นและ ได้จัดตั้ง คณะทำงานขึ้นมาจด...",
    }
  },
  {
    label: "บริการข้อมูลธุรกิจ",
    url: "#",
    megaMenu: {
      title: "บริการข้อมูลธุรกิจ",
      columns: [
        [
          { label: "E-Book / วารสาร", url: "/services/ebook" },
          { label: "ข่าวประชาสัมพันธ์", url: "/services/pr" },
          { label: "บทความและสาระความรู้", url: "/services/articles" },
          { label: "ระเบียบและทุนรางวัล", url: "/services/rules" },
          { label: "วันประกันชีวิตแห่งชาติ", url: "/services/national-day" },
          { label: "เอกสารอ่านเสริมสอบ ศค.เพชร ยอดมงกุฎ", url: "/services/docs" },
        ],
        [
          { label: "ข่าวธุรกิจประกันชีวิต", url: "/services/news" },
          { label: "กฎหมายและประกาศ", url: "/services/law" },
          { label: "รายงานประจำปี", url: "/services/annual-report" },
          { label: "รางวัลตัวแทนคุณภาพดีเด่นแห่งชาติ", url: "/services/awards" },
          { label: "รายงานธุรกิจประกันชีวิต (แนะนำให้ใช้ Google Chrome สำหรับดาวน์โหลดเอกสาร)", url: "/services/report" },
        ]
      ],
      image: "/4ca3b1d2.jpg",
      imageTitle: "บริการข้อมูลธุรกิจ",
      imageDesc: "รายงานการรับประกันชีวิตจำแนกตามช่องทาง",
    }
  },
  {
    label: "อบรมใบอนุญาตฯ/ขอรับนายหน้าประกันชีวิต",
    url: "#",
    megaMenu: {
      title: "อบรมใบอนุญาตฯ/ขอรับนายหน้าประกันชีวิต",
      columns: [
        [
          { label: "หลักสูตรอบรมใบอนุญาต", url: "/training/course" },
          { label: "เอกสารดาวน์โหลด", url: "/training/download" },
          { label: "กำหนดการรับสมัคร - วันสอบ - สถานที่สอบ", url: "/training/schedule" },
        ],
        [
          { label: "สมัครโครงการอบรมขอรับและสอบใบอนุญาตเป็นตัวแทนฯ", url: "/training/apply" },
          { label: "แนะนำวิธีการสอบออนไลน์", url: "/training/online-guide" },
          { label: "จองคิวสมัครสอบใบอนุญาตตัวแทนประกันชีวิต", url: "/training/book" },
        ]
      ],
      image: "/25954acb.jpg",
      imageTitle: "อบรมใบอนุญาตฯ/ขอรับนายหน้าประกันชีวิต",
      imageDesc: "อบรมหลักสูตรใบอนุญาตตัวแทนประกันชีวิต ตารางอบรมหลักสูตรความรู้เกี่ยวกับกรมธรรม์ประกันชีวิต",
    }
  },
  {
    label: "ตรวจสอบรายชื่อผู้มีสิทธิสอบ/อบรม",
    url: "#",
    megaMenu: {
      title: "ตรวจสอบรายชื่อผู้มีสิทธิสอบ/อบรม",
      columns: [
        [
          { label: "ประกาศรายชื่อผู้มีสิทธิ-ผู้ผ่านการอบรมฯ", url: "/check/list" },
        ],
        [
          { label: "ตรวจผลสอบ", url: "/check/result" },
          { label: "ตรวจชื่อผู้มีสิทธิสอบ", url: "/check/name" },
        ]
      ],
      image: "/87276fad.jpg",
      imageTitle: "ตรวจสอบรายชื่อผู้มีสิทธิสอบ/อบรม",
      imageDesc: "",
    }
  },
  {
    label: "สอบใบอนุญาตตัวแทนประกันชีวิต",
    url: "/exam-registration",
  },
  {
    label: "ติดต่อสมาคม",
    url: "/contact",
  },
];

/* ── Highlight CTA buttons on the right ── */
const CTA_BUTTONS = [
  { label: "สมัครสอบใบอนุญาตฯ", url: "/exam-registration", icon: "📋" },
  { label: "สมัครอบรมก่อนสอบ", url: "/register-training", icon: "📝" },
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
      {/* ── Top Bar with Actions & Flag ── */}
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <img src="/flag-th.png" alt="TH" className="site-header__flag" />
          <div className="site-header__actions">
            {CTA_BUTTONS.map((btn, i) => (
              <Link
                key={i}
                href={btn.url}
                className="site-header__action-btn"
              >
                <span className="site-header__action-icon">{btn.icon}</span>
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="site-header__main">
        <div className="container site-header__main-inner">
          {/* ── Logo Area (With curved background) ── */}
          <div className="site-header__logo-wrapper">
            <Link href="/" className="site-header__logo">
              <img
                src="/logo.png"
                alt="สมาคมประกันชีวิตไทย"
                className="site-header__logo-img site-header__logo-img--desktop"
              />
              <img
                src="/logo2024_mobile.png"
                alt="สมาคมประกันชีวิตไทย"
                className="site-header__logo-img site-header__logo-img--mobile"
              />
              <div className="site-header__logo-text">
                <span className="site-header__logo-th">สมาคมประกันชีวิตไทย</span>
                <span className="site-header__logo-en">The Thai Life Assurance Association</span>
              </div>
            </Link>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="site-header__nav">
            {NAV_MENU.map((item, i) => (
              <div
                key={i}
                className="site-header__nav-item"
                onMouseEnter={() => item.megaMenu && setActiveDropdown(i)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={item.url} className="site-header__nav-link">
                  {item.label}
                  {item.megaMenu && (
                    <svg className="site-header__nav-arrow" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </svg>
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {item.megaMenu && activeDropdown === i && (
                  <div className="site-header__mega-menu">
                    <div className="container site-header__mega-inner">

                      {/* Left: Columns */}
                      <div className="site-header__mega-columns">
                        {item.megaMenu.columns.map((col, cIdx) => (
                          <div key={cIdx} className="site-header__mega-col">
                            {cIdx === 0 ? (
                              <h3 className="site-header__mega-title">{item.megaMenu!.title}</h3>
                            ) : (
                              <h3 className="site-header__mega-title">&nbsp;</h3>
                            )}
                            <ul className="site-header__mega-list">
                              {col.map((link, lIdx) => (
                                <li key={lIdx}>
                                  <Link href={link.url} className="site-header__mega-link">
                                    &gt; {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Right: Featured Block */}
                      <div className="site-header__mega-featured">
                        <img src={item.megaMenu.image} alt={item.megaMenu.imageTitle} />
                        <h4>{item.megaMenu.imageTitle}</h4>
                        {item.megaMenu.imageDesc && <p>{item.megaMenu.imageDesc}</p>}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Actions (Visible only on mobile/tablet) */}
          <div className="site-header__mobile-top-actions">
            <img src="/flag-th.png" alt="TH" className="site-header__flag" />
            <div className="site-header__actions">
              {CTA_BUTTONS.map((btn, i) => (
                <Link
                  key={i}
                  href={btn.url}
                  className="site-header__action-btn"
                >
                  <span className="site-header__action-icon">{btn.icon}</span>
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile toggle */}
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
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="site-header__mobile-menu">
          {NAV_MENU.map((item, i) => (
            <div key={i} className="site-header__mobile-group">
              {item.megaMenu ? (
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
                      {item.megaMenu.columns.flat().map((child, j) => (
                        <Link
                          key={j}
                          href={child.url}
                          className="site-header__mobile-link site-header__mobile-link--child"
                          onClick={() => setMobileOpen(false)}
                        >
                          &gt; {child.label}
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
            {CTA_BUTTONS.map((btn, i) => (
              <Link
                key={i}
                href={btn.url}
                className="site-header__mobile-action-btn"
                onClick={() => setMobileOpen(false)}
              >
                {btn.icon} {btn.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
