"use client";

import { useState, useEffect, useCallback } from "react";
import type { HeroSlide } from "@/lib/home-types";

/* ── Default demo slides (used when CMS has no data) ── */
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "",
    subtitle: "",
    image_url: "",
    link_url: null,
    link_text: null,
    order: 0,
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
    if (data.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, data.length]);

  const renderSlide = (slide: HeroSlide, i: number) => {
    const inner = slide.image_url ? (
      <img
        src={slide.image_url}
        alt={slide.title || `Slide ${i + 1}`}
        className="hero-slider__bg"
      />
    ) : (
      <div className="hero-slider__bg hero-slider__bg--gradient" />
    );

    // If admin provided a link, wrap the image in an <a> tag
    if (slide.link_url) {
      return (
        <a
          href={slide.link_url}
          className={`hero-slider__slide ${i === current ? "active" : ""}`}
          key={slide.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      );
    }

    return (
      <div
        key={slide.id}
        className={`hero-slider__slide ${i === current ? "active" : ""}`}
      >
        {inner}
      </div>
    );
  };

  return (
    <section id="hero-slider" className="hero-slider">
      {/* Slide container */}
      <div className="hero-slider__track">
        {data.map((slide, i) => renderSlide(slide, i))}
      </div>

      {/* Navigation arrows */}
      {data.length > 1 && (
        <>
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
        </>
      )}

      {/* Dots */}
      {data.length > 1 && (
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
      )}
    </section>
  );
}
