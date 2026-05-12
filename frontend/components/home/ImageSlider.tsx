"use client";

import { useState, useEffect, useCallback } from "react";
import type { HeroSlide } from "@/lib/home-types";

/* ── Default demo slides (used when CMS has no data) ── */
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "ระเบียบการแต่งกาย\nเพื่อเข้าสอบ ตัวแทนประกันชีวิต",
    subtitle: "ตามประกาศสำนักงาน คปภ. เรื่อง การศึกษาวิชาประกันชีวิต/วินาศภัย และหลักสูตรวิชาการ และเงื่อนไขการสอบ พ.ศ. 2563",
    image_url: "",
    link_url: "#",
    link_text: "อ่านเพิ่มเติม (คลิก)",
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    title: "สมาคมประกันชีวิตไทย",
    subtitle: "ศูนย์กลางความร่วมมือและพัฒนาอุตสาหกรรมประกันชีวิตไทย",
    image_url: "",
    link_url: "#",
    link_text: "เรียนรู้เพิ่มเติม",
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

interface Props {
  slides?: HeroSlide[];
}

export default function ImageSlider({ slides }: Props) {
  const data = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % data.length), [current, data.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + data.length) % data.length), [current, data.length, goTo]);

  /* Auto-play */
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="hero-slider" className="hero-slider">
      {/* Slide container */}
      <div className="hero-slider__track">
        {data.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slider__slide ${i === current ? "active" : ""}`}
          >
            {/* Background image or gradient */}
            {slide.image_url ? (
              <img
                src={slide.image_url}
                alt={slide.title || ""}
                className="hero-slider__bg"
              />
            ) : (
              <div className="hero-slider__bg hero-slider__bg--gradient" />
            )}

            {/* Overlay */}
            <div className="hero-slider__overlay" />

            {/* Content */}
            <div className="hero-slider__content">
              {slide.title && (
                <h2 className="hero-slider__title">{slide.title}</h2>
              )}
              {slide.subtitle && (
                <p className="hero-slider__subtitle">{slide.subtitle}</p>
              )}
              {slide.link_url && slide.link_text && (
                <a href={slide.link_url} className="hero-slider__cta">
                  {slide.link_text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button className="hero-slider__arrow hero-slider__arrow--prev" onClick={prev} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hero-slider__arrow hero-slider__arrow--next" onClick={next} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hero-slider__dots">
        {data.map((_, i) => (
          <button
            key={i}
            className={`hero-slider__dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CMS note */}
      <div className="hero-slider__cms-note">
        💡 แนะนำภาพอัตราส่วน <strong>20:7</strong> (7929×2779 px)
      </div>
    </section>
  );
}
