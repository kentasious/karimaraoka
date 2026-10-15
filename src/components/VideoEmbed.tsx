"use client";

import { useState } from "react";

// 最初はサムネイルだけを表示し、クリックされたときにYouTubeを読み込む（ページを軽くするため）
export function VideoEmbed({
  youtubeId,
  title,
  playLabel,
  large,
  vertical,
}: {
  youtubeId: string;
  title: string;
  playLabel: string;
  large?: boolean;
  vertical?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const frameClass = vertical ? "video-frame vertical" : "video-frame";

  if (playing) {
    return (
      <div className={frameClass}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  const size = large ? 56 : 40;
  return (
    <button type="button" className={`${frameClass} video-poster`} onClick={() => setPlaying(true)} aria-label={`${playLabel}: ${title}`}>
      <img src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 88 88" fill="none" stroke="#FFFFFF" strokeWidth={large ? 1.2 : 1.6}>
        <circle cx="44" cy="44" r="43" />
        <path d="M37 30 L60 44 L37 58 Z" />
      </svg>
    </button>
  );
}
