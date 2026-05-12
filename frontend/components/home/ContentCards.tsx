"use client";

import { useState } from "react";
import type { ContentCard as ContentCardType } from "@/lib/home-types";

const DEFAULT_CARDS: ContentCardType[] = [
  {
    id: 1,
    title: "ผู้บำนวยการสมาคมประกันชีวิต",
    description: "ข่าวสมาคมล่าสุดเกี่ยวกับกิจกรรมและความเคลื่อนไหว",
    image_url: "",
    link_url: "#",
    category: "ข่าวสมาคม",
    date_text: "เมื่อวานนี้ · 156 ครั้ง",
    view_count: 156,
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    title: "สมาคมประกันชีวิตจัดสัมมนาประจำปี",
    description: "การสัมมนาเชิงวิชาการเกี่ยวกับทิศทางอุตสาหกรรม",
    image_url: "",
    link_url: "#",
    category: "ข่าวประชาสัมพันธ์",
    date_text: "3 วันก่อน · 289 ครั้ง",
    view_count: 289,
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    title: "ปรับปรุงกฎระเบียบการสอบตัวแทน",
    description: "ข้อมูลอัปเดตเกี่ยวกับการสอบตัวแทนประกันชีวิต",
    image_url: "",
    link_url: "#",
    category: "ข่าวสมาคม",
    date_text: "1 สัปดาห์ก่อน · 412 ครั้ง",
    view_count: 412,
    order: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    title: "ประกันชีวิตดิจิทัล แนวทางใหม่",
    description: "การนำเทคโนโลยีมาใช้ในการพัฒนาอุตสาหกรรม",
    image_url: "",
    link_url: "#",
    category: "ข่าวสมาคม",
    date_text: "2 สัปดาห์ก่อน · 198 ครั้ง",
    view_count: 198,
    order: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

const CATEGORIES = ["ทั้งหมด", "ข่าวสมาคม", "ข่าวประชาสัมพันธ์"];

interface Props {
  cards?: ContentCardType[];
}

export default function ContentCards({ cards }: Props) {
  const data = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  const filtered =
    activeCategory === "ทั้งหมด"
      ? data
      : data.filter((c) => c.category === activeCategory);

  return (
    <section id="content-cards" className="content-cards">
      <div className="container">
        {/* Category tabs */}
        <div className="content-cards__tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`content-cards__tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="content-cards__grid">
          {filtered.map((card) => (
            <a
              key={card.id}
              href={card.link_url || "#"}
              className="content-card"
            >
              <div className="content-card__image">
                {card.image_url ? (
                  <img src={card.image_url} alt={card.title} />
                ) : (
                  <div className="content-card__placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
                {card.category && (
                  <span className="content-card__category">{card.category}</span>
                )}
              </div>
              <div className="content-card__body">
                <h3 className="content-card__title">{card.title}</h3>
                {card.description && (
                  <p className="content-card__desc">{card.description}</p>
                )}
                {card.date_text && (
                  <span className="content-card__meta">{card.date_text}</span>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* View all button */}
        <div className="content-cards__more">
          <a href="/news" className="btn btn-outline">
            ดูข่าวทั้งหมด
          </a>
        </div>
      </div>
    </section>
  );
}
