"use client";

import { useRef, useState } from "react";
import type { CarouselCard as CarouselCardType } from "@/lib/home-types";

const DEFAULT_CAROUSEL: CarouselCardType[] = [
  { id: 1, title: "เอกสารเผยแพร่ ฉบับที่ 1", image_url: "", link_url: "#", category: "เอกสาร", order: 0, is_active: true, created_at: "", updated_at: "" },
  { id: 2, title: "รายงานประจำปี 2566", image_url: "", link_url: "#", category: "การเผยแพร่ความรู้", order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 3, title: "สถิติประกันชีวิต", image_url: "", link_url: "#", category: "เอกสาร", order: 2, is_active: true, created_at: "", updated_at: "" },
  { id: 4, title: "คู่มือตัวแทนประกันชีวิต", image_url: "", link_url: "#", category: "เอกสาร", order: 3, is_active: true, created_at: "", updated_at: "" },
  { id: 5, title: "จรรยาบรรณตัวแทน", image_url: "", link_url: "#", category: "เอกสาร", order: 4, is_active: true, created_at: "", updated_at: "" },
  { id: 6, title: "แผนพัฒนาอุตสาหกรรม", image_url: "", link_url: "#", category: "การเผยแพร่ความรู้", order: 5, is_active: true, created_at: "", updated_at: "" },
];

interface Props {
  cards?: CarouselCardType[];
}

export default function CardCarousel({ cards }: Props) {
  const data = cards && cards.length > 0 ? cards : DEFAULT_CAROUSEL;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    const newPos =
      direction === "left"
        ? Math.max(0, scrollPos - amount)
        : scrollPos + amount;
    scrollRef.current.scrollTo({ left: newPos, behavior: "smooth" });
    setScrollPos(newPos);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPos(scrollRef.current.scrollLeft);
    }
  };

  // Calculate dot indicators
  const totalWidth = data.length * 220;
  const viewWidth = typeof window !== "undefined" ? Math.min(1280, window.innerWidth) : 1280;
  const totalDots = Math.max(1, Math.ceil(totalWidth / viewWidth));
  const activeDot = Math.min(
    totalDots - 1,
    Math.floor(scrollPos / viewWidth)
  );

  return (
    <section id="card-carousel" className="card-carousel">
      <div className="container">
        {/* Header */}
        <div className="card-carousel__header">
          <div className="card-carousel__header-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div>
            <h2 className="card-carousel__title">เอกสาร</h2>
            <p className="card-carousel__subtitle">การเผยแพร่ความรู้</p>
          </div>
        </div>

        {/* Scrollable track */}
        <div className="card-carousel__wrapper">
          <button
            className="card-carousel__arrow card-carousel__arrow--left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="card-carousel__track"
            onScroll={handleScroll}
          >
            {data.map((card) => (
              <a
                key={card.id}
                href={card.link_url || "#"}
                className="card-carousel__card"
              >
                <div className="card-carousel__card-image">
                  {card.image_url ? (
                    <img src={card.image_url} alt={card.title || ""} />
                  ) : (
                    <div className="card-carousel__card-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                  )}
                </div>
                {card.title && (
                  <p className="card-carousel__card-title">{card.title}</p>
                )}
              </a>
            ))}
          </div>

          <button
            className="card-carousel__arrow card-carousel__arrow--right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="card-carousel__dots">
          {Array.from({ length: totalDots }).map((_, i) => (
            <span
              key={i}
              className={`card-carousel__dot ${i === activeDot ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
