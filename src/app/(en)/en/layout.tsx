import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootHtml } from "@/components/RootHtml";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://karimaraoka.com"),
  title: "Karim Araoka — Dancer / Performer",
  description: "Portfolio of Karim Araoka, dancer and performer rooted in hip-hop and contemporary dance, working across live performance, music videos, commercials, fashion and art.",
  alternates: { canonical: "/en/", languages: { ja: "/", en: "/en/" } },
  openGraph: {
    title: "Karim Araoka",
    description: "Dancer / Performer — Hiphop / Contemporary",
    url: "/en/",
    siteName: "Karim Araoka",
    images: [{ url: "/images/orange.jpg", width: 1067, height: 1600 }],
    locale: "en_US",
    type: "website",
  },
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
