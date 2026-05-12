"use client";

import type { FeatureCard as FeatureCardType } from "@/lib/home-types";

const DEFAULT_FEATURES: FeatureCardType[] = [
  {
    id: 1,
    title: "สมัครสอบตัวแทน",
    description: "สมัครสอบใบอนุญาตตัวแทนประกันชีวิต",
    image_url: "",
    link_url: "#",
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    title: "เข้าสู่ระบบ",
    description: "ระบบสำหรับสมาชิกและตัวแทน",
    image_url: "",
    link_url: "#",
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    title: "ข้อมูลสถิติ",
    description: "สถิติอุตสาหกรรมประกันชีวิตไทย",
    image_url: "",
    link_url: "#",
    order: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    title: "ติดต่อสมาคม",
    description: "ช่องทางติดต่อสมาคมประกันชีวิตไทย",
    image_url: "",
    link_url: "#",
    order: 3,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

interface Props {
  features?: FeatureCardType[];
}

export default function FeatureCards({ features }: Props) {
  const data = features && features.length > 0 ? features : DEFAULT_FEATURES;

  const icons = ["📋", "🔐", "📊", "📞"];

  return (
    <section id="feature-cards" className="feature-cards">
      <div className="container">
        <div className="feature-cards__grid">
          {data.map((card, i) => (
            <a
              key={card.id}
              href={card.link_url || "#"}
              className="feature-card"
            >
              <div className="feature-card__image">
                {card.image_url ? (
                  <img src={card.image_url} alt={card.title} />
                ) : (
                  <div className="feature-card__placeholder">
                    <span className="feature-card__icon">{icons[i % icons.length]}</span>
                  </div>
                )}
              </div>
              <div className="feature-card__body">
                <h3 className="feature-card__title">{card.title}</h3>
                {card.description && (
                  <p className="feature-card__desc">{card.description}</p>
                )}
              </div>
              <div className="feature-card__arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
