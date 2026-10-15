// ============================================================
// サイトの中身はすべてこのファイルにまとめています。
// 年1回の更新では、基本的にこのファイルだけを書き換えます。
//   ja: 日本語ページの文言 / en: 英語ページの文言
// ============================================================

export type Lang = "ja" | "en";
type Text = { ja: string; en: string };

// ---- 基本情報 ----------------------------------------------
export const profile = {
  nameEn: "Karim",
  nameFull: { ja: "荒岡カリム", en: "Karim Araoka" } as Text,
  role: "Dancer / Performer",
  genre: "Hiphop / Contemporary",
  instagram: "https://www.instagram.com/karimaraoka/",
  instagramHandle: "@karimaraoka",
};

// 依頼フォームの送り先メールアドレスは wrangler.jsonc で設定しています。

// ---- トップのスライドショー --------------------------------
// 縦横比が違う写真もそのまま使えます。順番どおりに切り替わります。
export const heroSlides = [
  { src: "/images/orange.jpg", alt: "オレンジの背景の前で床に座るカリム", width: 1067, height: 1600 },
  { src: "/images/mono.jpg", alt: "白いシャツで腕を頭に添えて微笑むカリム", width: 1067, height: 1600 },
  { src: "/images/hat.jpg", alt: "ハットをかぶりバルコニーの椅子でくつろぐカリム", width: 864, height: 1080 },
  { src: "/images/green.jpg", alt: "緑の背景の前を植物を持って歩くカリム", width: 1067, height: 1600 },
  { src: "/images/mountain.jpg", alt: "山を背景に片足で踊るカリム", width: 864, height: 1080 },
];
export const heroIntervalSeconds = 8; // 写真が切り替わる間隔（秒）

// ---- ステートメント ------------------------------------------
// 空欄（""）にするとセクションごと非表示になります。
export const statement: Text = {
  ja: "［ステートメント：カリムさん自身の言葉で、ダンスへの思いを2〜3行］",
  en: "[Statement — two or three lines in Karim's own words]",
};

// ---- 映像（Film）---------------------------------------------
// 1本目が大きく表示されます。youtubeId は URL の youtu.be/ のあとの文字列です。
export const films = [
  { title: "NOWNESS ASIA「ANAMNESIS」", note: { ja: "Dance Film — Main Act", en: "Dance Film — Main Act" } as Text, youtubeId: "TcOjAuIn_ZE" },
  { title: "満島ひかり「Shadow Dance」", note: { ja: "Music Video", en: "Music Video" } as Text, youtubeId: "W7AeETUJwy4" },
  { title: "MINTIA CM「雨上がり」篇", note: { ja: "2025 — CM", en: "2025 — Commercial" } as Text, youtubeId: "cFRMVNjlM5w" },
];

// ---- 写真（Photographs）-------------------------------------
export const photographs = [
  { src: "/images/mono.jpg", alt: "白いシャツで腕を頭に添えて微笑むカリム", width: 1067, height: 1600 },
  { src: "/images/mountain.jpg", alt: "山を背景に片足で踊るカリム", width: 864, height: 1080 },
  { src: "/images/green.jpg", alt: "緑の背景の前を植物を持って歩くカリム", width: 1067, height: 1600 },
  { src: "/images/mono-stand.jpg", alt: "白いシャツにデニムで立つカリム", width: 1067, height: 1600 },
  { src: "/images/flower.jpg", alt: "緑の背景の前で花を差し出されるカリム", width: 1067, height: 1600 },
  { src: "/images/mono-sit.jpg", alt: "床に座りこちらを見るカリム", width: 1067, height: 1600 },
];

// ---- プロフィール --------------------------------------------
export const bio: Text = {
  ja: "HIPHOP・Contemporaryを軸に、LIVE、Music Video、CM、ファッション、アート作品など幅広いフィールドで活動。",
  en: "Rooted in hip-hop and contemporary dance, Karim works across live performance, music videos, commercials, fashion and art.",
};

export const mainWorks = [
  "GU Global",
  "DIANA ROSS「DIANA IN MOTION JAPAN 2026」",
  "三浦大知 LIVE TOUR「Raw / Bare」",
  "NHK紅白歌合戦",
  "NOWNESS ASIA「ANAMNESIS」MAIN ACT",
  "KinKi Kids MV",
  "満島ひかり × MONDO GROSSO MV",
  "imase MV",
  "sumika MV",
  "AKB48 MV",
  "MINTIA CM",
  "D.LEAGUE「LIFULL ALT-RHYTHM」",
];

// ---- 実績（Career）-------------------------------------------
// year が空欄（""）の行は「—」と表示されます。link は無くてもOKです。
type CareerItem = { year: string; title: string; role: string; detail?: Text; link?: string };
type CareerGroup = { label: string; items: CareerItem[] };

export const career: CareerGroup[] = [
  {
    label: "Live / Stage",
    items: [
      { year: "2026", title: "三浦大知 LIVE TOUR「Raw / Bare」", role: "Dancer" },
      { year: "2026", title: "DIANA ROSS「DIANA IN MOTION JAPAN 2026」", role: "Back Dancer", link: "https://odoriba.tokyo/works/?p=739" },
      { year: "2024", title: "第74回 NHK紅白歌合戦 グランドオープニングショー", role: "Dancer" },
      {
        year: "2021–26",
        title: "D.LEAGUE — dip BATTLES / LIFULL ALT-RHYTHM",
        role: "Dancer",
        detail: {
          ja: "21-22シーズンよりD.LEAGUEに参戦。その後LIFULL ALT-RHYTHMに移籍し、25-26シーズンまで活動。",
          en: "Joined D.LEAGUE in the 21-22 season, later moving to LIFULL ALT-RHYTHM through the 25-26 season.",
        },
      },
    ],
  },
  {
    label: "CM / Advertisement",
    items: [
      { year: "2026", title: "GU Global 広告", role: "Model / Dancer", link: "https://www.instagram.com/reel/DUaR_Ylkqqa/" },
      { year: "2025", title: "MINTIA CM「いい今日を、ポケットに。雨上がり」篇", role: "Cast", link: "https://youtu.be/cFRMVNjlM5w" },
    ],
  },
  {
    label: "Music Video",
    items: [
      { year: "", title: "オーイシマサヨシ「ギフト」", role: "MV", link: "https://youtu.be/_QiVgICckPk" },
      { year: "", title: "KinKi Kids「シュレーディンガー」", role: "MV", link: "https://youtu.be/fM15xU6LZ7A" },
      { year: "", title: "満島ひかり「Shadow Dance (Prod. MONDO GROSSO)」", role: "MV", link: "https://youtu.be/W7AeETUJwy4" },
      { year: "", title: "sumika「Vermillion」", role: "MV", link: "https://youtu.be/Epd7n5fqoNw" },
      { year: "", title: "AKB48「好きish」", role: "MV", link: "https://youtu.be/IT2X9ZtjHoI" },
    ],
  },
  {
    label: "Art / Dance Film",
    items: [
      {
        year: "",
        title: "NOWNESS ASIA「ANAMNESIS」",
        role: "Main Act",
        link: "https://youtu.be/TcOjAuIn_ZE",
        detail: {
          ja: "日本の「能」とContemporary Danceを融合した映像作品にメインキャストとして出演。",
          en: "Main cast in a film fusing Japanese Noh theatre with contemporary dance.",
        },
      },
      { year: "", title: "Toshiki Yashiro「A little side quest」", role: "Main Act", link: "https://www.instagram.com/reel/DOI0WJdkmlG/" },
    ],
  },
];
