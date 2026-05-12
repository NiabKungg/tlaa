"use client";

import { useState, useCallback, useEffect } from "react";
import type { VideoItem } from "@/lib/home-types";

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: "วิดีโอ สมาคมฯ - The Thai Life Assurance Association",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: null,
    description: "วิดีโอแนะนำสมาคมประกันชีวิตไทย",
    order: 0,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    title: "กิจกรรมประจำปี สมาคมประกันชีวิตไทย",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail_url: null,
    description: "รวมภาพกิจกรรมและสัมมนาประจำปี",
    order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];

/**
 * Extract YouTube video ID from various URL formats.
 */
function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

interface Props {
  videos?: VideoItem[];
}

export default function VideoSlider({ videos }: Props) {
  const data = videos && videos.length > 0 ? videos : DEFAULT_VIDEOS;
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % data.length);
    setIsPlaying(false);
  }, [data.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + data.length) % data.length);
    setIsPlaying(false);
  }, [data.length]);

  /* Auto-play slides only when not playing a video */
  useEffect(() => {
    if (isPlaying) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, isPlaying]);

  const activeVideo = data[current];
  const videoId = getYouTubeId(activeVideo.youtube_url);

  return (
    <section id="video-slider" className="video-slider">
      <div className="video-slider__inner">
        {/* Player */}
        <div className="video-slider__player">
          {isPlaying && videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="video-slider__iframe"
            />
          ) : (
            <div
              className="video-slider__thumbnail"
              onClick={() => setIsPlaying(true)}
            >
              {/* YouTube thumbnail */}
              {videoId ? (
                <img
                  src={activeVideo.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={activeVideo.title}
                />
              ) : (
                <div className="video-slider__placeholder" />
              )}
              {/* Play button */}
              <div className="video-slider__play-btn">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.6)" stroke="white" strokeWidth="2" />
                  <polygon points="26,20 26,44 46,32" fill="white" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="video-slider__info">
          <h3 className="video-slider__section-title">
            วิดีโอ สมาคมฯ
          </h3>
          <p className="video-slider__section-subtitle">
            The Thai Life Assurance Association
          </p>
          <h4 className="video-slider__title">{activeVideo.title}</h4>
          {activeVideo.description && (
            <p className="video-slider__desc">{activeVideo.description}</p>
          )}

          {/* Video list */}
          <div className="video-slider__list">
            {data.map((v, i) => (
              <button
                key={v.id}
                className={`video-slider__list-item ${i === current ? "active" : ""}`}
                onClick={() => { setCurrent(i); setIsPlaying(false); }}
              >
                <span className="video-slider__list-num">{i + 1}</span>
                <span className="video-slider__list-label">{v.title}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="video-slider__nav">
            <button onClick={prev} className="video-slider__nav-btn" aria-label="Previous video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="video-slider__counter">
              {current + 1} / {data.length}
            </span>
            <button onClick={next} className="video-slider__nav-btn" aria-label="Next video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
