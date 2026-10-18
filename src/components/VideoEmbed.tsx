"use client";

import { useEffect, useRef, useState } from "react";

// サイト上ではサムネイルだけを表示し、押されたら画面中央の大きな枠（モーダル）で再生する。
// YouTubeはモーダルを開いたときに初めて読み込むので、ページは軽いまま。
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
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const frameClass = vertical ? "video-frame vertical" : "video-frame";
  const size = large ? 56 : 40;

  return (
    <>
      <button type="button" className={`${frameClass} video-poster`} onClick={() => setOpen(true)} aria-label={`${playLabel}: ${title}`}>
        <img src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
        <svg aria-hidden="true" width={size} height={size} viewBox="0 0 88 88" fill="none" stroke="#FFFFFF" strokeWidth={large ? 1.2 : 1.6}>
          <circle cx="44" cy="44" r="43" />
          <path d="M37 30 L60 44 L37 58 Z" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        className="video-modal"
        aria-label={title}
        onClose={() => setOpen(false)}
        // 動画の外側（暗い部分）を押したら閉じる
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <>
            <button type="button" className="video-modal-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 3 L19 19 M19 3 L3 19" />
              </svg>
            </button>
            <div className={vertical ? "video-modal-frame vertical" : "video-modal-frame"}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
