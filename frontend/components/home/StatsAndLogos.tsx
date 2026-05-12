"use client";

import type { StatItem } from "@/lib/home-types";
import type { LogoItem } from "@/lib/home-types";

const DEFAULT_STATS: StatItem[] = [
  {
    id: 1,
    title: "สมาคมประกันชีวิตไทย",
    description: "ปัจจุบัน สมาคมประกันชีวิตไทย มีสมาชิกบริษัททั้งสิ้น 22 บริษัท เบี้ยประกันรับโดยตรงของบริษัทสมาชิก",
    stat_number: "22",
    stat_label: "มีสมาชิก\nบริษัทถึงสิ้นของประเทศ",
    icon_url: null,
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

const DEFAULT_LOGOS: LogoItem[] = [
  { id: 1, company_name: "AIA", logo_url: "", website_url: "#", order: 0, is_active: true, created_at: "", updated_at: "" },
  { id: 2, company_name: "เมืองไทยประกันชีวิต", logo_url: "", website_url: "#", order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 3, company_name: "กรุงเทพประกันชีวิต", logo_url: "", website_url: "#", order: 2, is_active: true, created_at: "", updated_at: "" },
  { id: 4, company_name: "ไทยประกันชีวิต", logo_url: "", website_url: "#", order: 3, is_active: true, created_at: "", updated_at: "" },
  { id: 5, company_name: "FWD", logo_url: "", website_url: "#", order: 4, is_active: true, created_at: "", updated_at: "" },
  { id: 6, company_name: "แอกซ่า", logo_url: "", website_url: "#", order: 5, is_active: true, created_at: "", updated_at: "" },
  { id: 7, company_name: "ทิพยประกันชีวิต", logo_url: "", website_url: "#", order: 6, is_active: true, created_at: "", updated_at: "" },
  { id: 8, company_name: "พรูเดนเชียล", logo_url: "", website_url: "#", order: 7, is_active: true, created_at: "", updated_at: "" },
  { id: 9, company_name: "อลิอันซ์อยุธยา", logo_url: "", website_url: "#", order: 8, is_active: true, created_at: "", updated_at: "" },
  { id: 10, company_name: "แมนูไลฟ์", logo_url: "", website_url: "#", order: 9, is_active: true, created_at: "", updated_at: "" },
  { id: 11, company_name: "ไทยสมุทรประกันชีวิต", logo_url: "", website_url: "#", order: 10, is_active: true, created_at: "", updated_at: "" },
  { id: 12, company_name: "กรุงไทย-แอกซ่า", logo_url: "", website_url: "#", order: 11, is_active: true, created_at: "", updated_at: "" },
];

interface Props {
  stats?: StatItem[];
  logos?: LogoItem[];
}

export default function StatsAndLogos({ stats, logos }: Props) {
  const statData = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  const logoData = logos && logos.length > 0 ? logos : DEFAULT_LOGOS;
  const stat = statData[0];

  return (
    <section id="stats-logos" className="stats-logos">
      <div className="stats-logos__inner">
        {/* Left: Stats */}
        <div className="stats-logos__stats">
          <h2 className="stats-logos__title">{stat.title}</h2>
          {stat.description && (
            <p className="stats-logos__desc">{stat.description}</p>
          )}
          <div className="stats-logos__number-block">
            <span className="stats-logos__number">{stat.stat_number}</span>
            <span className="stats-logos__label">{stat.stat_label}</span>
          </div>
        </div>

        {/* Right: Logo grid */}
        <div className="stats-logos__grid">
          {logoData.map((logo) => (
            <a
              key={logo.id}
              href={logo.website_url || "#"}
              className="stats-logos__logo"
              title={logo.company_name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {logo.logo_url ? (
                <img src={logo.logo_url} alt={logo.company_name} />
              ) : (
                <div className="stats-logos__logo-placeholder">
                  <span>{logo.company_name.substring(0, 3)}</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
