import type { ReactNode } from "react";
import {
  type Lang,
  profile,
  heroSlides,
  heroIntervalSeconds,
  statement,
  reel,
  filmWorks,
  photographs,
  bio,
  mainWorks,
  career,
} from "@/data/content";
import { labels } from "@/data/labels";
import { Hero } from "./HeroSlideshow";
import { VideoEmbed } from "./VideoEmbed";
import { ContactForm } from "./ContactForm";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 11 L11 3 M5 3 H11 V9" />
    </svg>
  );
}

function Section({ id, title, sub, children, narrow }: { id: string; title: string; sub: string; children: ReactNode; narrow?: boolean }) {
  return (
    <section id={id} className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {sub && <span>{sub}</span>}
      </div>
      <div className={narrow ? "section-body narrow" : "section-body"}>{children}</div>
    </section>
  );
}

export function Site({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const home = lang === "ja" ? "/" : "/en/";
  const sub = (ja: string) => (lang === "ja" ? ja : "");

  return (
    <div className="page">
      <header className="site-header">
        <a href={home} className="logo">
          {profile.nameEn}
        </a>
        <nav aria-label={t.menu} className="nav">
          <a href="#film">Film</a>
          <a href="#photographs">Photographs</a>
          <a href="#profile">Profile</a>
          <a href="#career">Career</a>
          <a href="#contact">Contact</a>
          <span className="lang-switch">
            <a href="/" aria-current={lang === "ja" ? "true" : undefined} lang="ja">
              JA
            </a>
            <span aria-hidden="true">/</span>
            <a href="/en/" aria-current={lang === "en" ? "true" : undefined} lang="en">
              EN
            </a>
          </span>
        </nav>
      </header>

      <main>
        <Hero slides={heroSlides} intervalSeconds={heroIntervalSeconds}>
          <h1 className="hero-name">{profile.nameEn}</h1>
          {lang === "ja" ? <p className="hero-name-ja">{profile.nameFull.ja}</p> : <p className="hero-name-en">{profile.nameFull.en}</p>}
          <p className="hero-meta">{profile.role}</p>
          <p className="hero-meta tight">{profile.genre}</p>
        </Hero>

        {statement[lang] && (
          <section aria-label="Statement" className="statement">
            {/* 日本語が含まれていれば明朝体、英語だけならセリフ体の斜体で表示 */}
            <p className={/[぀-ヿ一-鿿]/.test(statement[lang]) ? "statement-ja" : "statement-en"}>{statement[lang]}</p>
          </section>
        )}

        <Section id="film" title="Film" sub={sub(t.film)}>
          <div className="film-groups">
            {reel.length > 0 && (
              <div className="film-lead">
                <VideoEmbed youtubeId={reel[0].youtubeId} title={`${profile.nameFull.en} — Film 1`} playLabel={t.play} large vertical={reel[0].vertical} />
              </div>
            )}
            {reel.length > 1 && (
              <div className="film-row">
                {reel.slice(1).map((v, i) => (
                  <div key={v.youtubeId} className={v.vertical ? "film film-vertical" : "film"}>
                    <VideoEmbed youtubeId={v.youtubeId} title={`${profile.nameFull.en} — Film ${i + 2}`} playLabel={t.play} vertical={v.vertical} />
                  </div>
                ))}
              </div>
            )}
            {filmWorks.length > 0 && (
              <div className="film-works">
                {filmWorks.map((f) => (
                  <figure key={f.youtubeId} className="film-work">
                    <VideoEmbed youtubeId={f.youtubeId} title={f.title} playLabel={t.play} />
                    <figcaption>
                      <span>{f.title}</span>
                      <span className="muted small">{f.note[lang]}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </Section>

        <Section id="photographs" title="Photographs" sub={sub(t.photographs)}>
          <div className="photos">
            {photographs.map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
            ))}
          </div>
        </Section>

        <Section id="profile" title="Profile" sub={sub(t.profile)} narrow>
          <div className="profile-name">
            <span className={lang === "ja" ? "profile-name-ja" : "profile-name-en"}>{profile.nameFull[lang]}</span>
            <span className="eyebrow">{profile.role}</span>
          </div>
          <p className="bio">{bio[lang]}</p>
          {lang === "ja" && <p className="muted small">{bio.en}</p>}
          <div className="main-works">
            <p className="eyebrow">{t.mainWorks}</p>
            <p>{mainWorks.join(" ／ ")}</p>
          </div>
        </Section>

        <Section id="career" title="Career" sub={sub(t.career)}>
          <div className="career">
            {career.map((group) => (
              <div key={group.label} className="career-group">
                <h3 className="eyebrow">{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <span className="career-year">{item.year || "—"}</span>
                      <span className="career-title">
                        <span>{item.title}</span>
                        {item.detail && <span className="career-detail">{item.detail[lang]}</span>}
                      </span>
                      <span className="career-role">{item.role}</span>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="career-link" aria-label={`${item.title} — ${t.open}`}>
                          <ArrowIcon />
                        </a>
                      ) : (
                        <span className="career-link" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact" sub={sub(t.contact)} narrow>
          <div className="contact-lead">
            <p>{t.contactLead}</p>
            {t.contactSub && <p className="muted small">{t.contactSub}</p>}
          </div>
          <ContactForm endpoint="/api/contact" labels={t} instagram={profile.instagram} />
        </Section>
      </main>

      <footer className="site-footer">
        <span>© {profile.nameFull.en}</span>
        <a href="#top">{t.backToTop}</a>
      </footer>
    </div>
  );
}
