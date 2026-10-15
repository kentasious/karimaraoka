import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootHtml } from "@/components/RootHtml";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://karimaraoka.com"),
  title: "Karim Araoka｜荒岡カリム — Dancer / Performer",
  description: "ダンサー・パフォーマー 荒岡カリムのポートフォリオ。HIPHOP・Contemporaryを軸に、LIVE、Music Video、CM、ファッション、アート作品など幅広いフィールドで活動。",
  alternates: { canonical: "/", languages: { ja: "/", en: "/en/" } },
  openGraph: {
    title: "Karim Araoka｜荒岡カリム",
    description: "Dancer / Performer — Hiphop / Contemporary",
    url: "/",
    siteName: "Karim Araoka",
    images: [{ url: "/images/orange.jpg", width: 1067, height: 1600 }],
    locale: "ja_JP",
    type: "website",
  },
};

export default function JaLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="ja">{children}</RootHtml>;
}
