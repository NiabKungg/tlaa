"use client";

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

  // Join all texts with a separator to create continuous scrolling content
  const fullText = data.map((s) => s.text).join("     ●     ");

  return (
    <section id="text-slider" className="text-slider">
      <div className="text-slider__marquee">
        {/* Duplicate content twice for seamless infinite loop */}
        <div className="text-slider__marquee-inner">
          <span className="text-slider__marquee-text">{fullText}</span>
        </div>
      </div>
    </section>
  );
}
