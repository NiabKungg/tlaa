"use client";

import { useState, useEffect, useCallback } from "react";
import type { TextSlide } from "@/lib/home-types";

const DEFAULT_TEXTS: TextSlide[] = [
  {
    id: 1,
    text: "ประกันชีวิต ประกันอนาคต อีกหนึ่งทางเลือก การออมอย่างมีวินัย ที่ดูแลคุณได้ ตลอดชีวิต",
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    text: "สมาคมประกันชีวิตไทย มุ่งมั่นพัฒนาอุตสาหกรรมประกันชีวิต เพื่อประโยชน์ของสังคมไทย",
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

interface Props {
  slides?: TextSlide[];
}

export default function TextSlider({ slides }: Props) {
  const data = slides && slides.length > 0 ? slides : DEFAULT_TEXTS;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % data.length);
  }, [data.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="text-slider" className="text-slider">
      <div className="text-slider__track">
        {data.map((slide, i) => (
          <div
            key={slide.id}
            className={`text-slider__item ${i === current ? "active" : ""}`}
          >
            <p>{slide.text}</p>
          </div>
        ))}
      </div>
      <div className="text-slider__dots">
        {data.map((_, i) => (
          <button
            key={i}
            className={`text-slider__dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Text slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
