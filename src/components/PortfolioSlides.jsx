import { withBase } from "../lib/assetPath";
import { toneGradient } from "../lib/tones";
import { profile } from "../data/profile";
import { internships, organizations, getItem } from "../data/experience";
import { works, getWork } from "../data/works";
import { certificates, getCertificate } from "../data/certificates";

// ============================================================
// Slide portofolio ukuran A4 landscape (297 × 210 mm).
// Tidak tampil di layar — hanya muncul saat dicetak / disimpan sebagai PDF.
// Gaya ada di index.css (class berawalan "pf-").
// ============================================================

const L = {
  id: {
    portfolio: "Portofolio",
    cover: "Portofolio",
    role: "Peran",
    year: "Tahun",
    gallery: "Galeri",
    code: "Kode di GitHub",
    tools: "Tools",
    contactTitle: "Mari terhubung",
    contactSub: "Terbuka untuk kolaborasi dan peluang kerja",
    thanks: "Terima kasih",
  },
  en: {
    portfolio: "Portfolio",
    cover: "Portfolio",
    role: "Role",
    year: "Year",
    gallery: "Gallery",
    code: "Code on GitHub",
    tools: "Tools",
    contactTitle: "Let's connect",
    contactSub: "Open for collaboration and job opportunities",
    thanks: "Thank you",
  },
};

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

function Slide({ title, kicker, children, page, total, name, label }) {
  return (
    <section className="pf-slide">
      <div className="pf-glow" />
      {title && (
        <header className="pf-head">
          {kicker && <span className="pf-kicker">{kicker}</span>}
          <h2>{title}</h2>
          <span className="pf-rule" />
        </header>
      )}
      <div className="pf-body">{children}</div>
      <footer className="pf-foot">
        <span>
          {name} · {label}
        </span>
        <span>
          {page} / {total}
        </span>
      </footer>
    </section>
  );
}

function Img({ src, alt = "", fit = "cover", tone = 0 }) {
  return (
    <div className={`pf-img bg-gradient-to-br ${toneGradient(tone)}`}>
      {src && (
        <img
          src={withBase(src)}
          alt={alt}
          style={{ objectFit: fit }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
}

export default function PortfolioSlides({ lang, t }) {
  const l = L[lang];
  const a = t.about;
  const name = profile.name;

  const projectList = works.map((w) => getWork(w, lang));
  const certList = certificates.map((c) => getCertificate(c, lang));
  const interns = internships.map((i) => getItem(i, lang));
  const orgs = organizations.map((o) => getItem(o, lang));

  // Susun daftar slide dulu supaya nomor halaman otomatis
  const slides = [];

  // 1. Cover
  slides.push({
    cover: true,
    render: () => (
      <section className="pf-slide pf-cover">
        <div className="pf-glow" />
        <div className="pf-cover-text">
          <span className="pf-kicker">{l.cover}</span>
          <h1>
            {t.hero.greeting}
            <br />
            {name}
          </h1>
          <p className="pf-role">{t.hero.role}</p>
          <p className="pf-tags">{t.hero.tags.join("  |  ")}</p>
          <p className="pf-lead">{t.hero.body}</p>
          <p className="pf-mail">{profile.email}</p>
        </div>
        <div className="pf-cover-photo">
          <img src={withBase(profile.photo)} alt={name} />
          <div className="pf-cover-card">
            <strong>{profile.shortName}</strong>
            <span>{t.hero.badgeRole}</span>
            <small>{t.hero.badgeMeta} · 2022 — 2026</small>
          </div>
        </div>
      </section>
    ),
  });

  // 2. Tentang
  slides.push({
    title: a.title,
    kicker: l.portfolio,
    render: () => (
      <div className="pf-cols pf-tight">
        <div>
          <p className="pf-p">{a.p1}</p>
          <p className="pf-p">{a.p2}</p>
          <div className="pf-card">
            <h3>{a.eduTitle}</h3>
            <p className="pf-strong">
              {a.eduDegree} — {a.eduSchool}
            </p>
            <p className="pf-muted">
              {a.eduPeriod} · {a.eduGpa}
            </p>
            <p className="pf-muted">{a.eduFocus}</p>
          </div>
          <h3 className="pf-sub">{a.toolsTitle}</h3>
          <div className="pf-chips">
            {profile.tools.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="pf-sub">{a.skillsTitle}</h3>
          <div className="pf-grid2">
            {a.services.map((s) => (
              <div className="pf-card" key={s.title}>
                <h4>{s.title}</h4>
                <p className="pf-small">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="pf-card">
            <h3>{a.standTitle}</h3>
            <p className="pf-small">{a.standP1}</p>
            <p className="pf-small">{a.standP2}</p>
          </div>
        </div>
      </div>
    ),
  });

  // 3. Magang
  slides.push({
    title: t.experience.title,
    kicker: l.portfolio,
    render: () => (
      <div className="pf-grid2 pf-grow">
        {interns.map((i) => (
          <div className="pf-card pf-tall" key={i.slug}>
            <span className="pf-chip">{i.chip}</span>
            <h4 className="pf-big">{i.role}</h4>
            <p className="pf-strong">{i.org}</p>
            {i.period && <p className="pf-muted">{i.period}</p>}
            <p className="pf-p">{i.summary}</p>
          </div>
        ))}
      </div>
    ),
  });

  // 4. Organisasi
  slides.push({
    title: t.organization.title,
    kicker: l.portfolio,
    render: () => (
      <div className="pf-grid2 pf-grow">
        {orgs.map((o) => (
          <div className="pf-card pf-tall" key={o.slug}>
            <span className="pf-chip">{o.period}</span>
            <h4 className="pf-big">{o.title}</h4>
            <p className="pf-strong">{o.org}</p>
            <ul className="pf-list">
              {o.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {o.tags && (
              <div className="pf-chips">
                {o.tags.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            )}
            {o.thumbs?.[0] && (
              <div className="pf-thumb">
                <Img src={o.thumbs[0].image} fit="contain" />
              </div>
            )}
          </div>
        ))}
      </div>
    ),
  });

  // 5+. Proyek (1 slide info + 1 slide galeri bila ada)
  projectList.forEach((w) => {
    slides.push({
      title: w.title,
      kicker: t.projects.title,
      render: () => (
        <div className="pf-project">
          <div className="pf-project-img">
            <Img src={w.cover} tone={w.tone} />
          </div>
          <div>
            <div className="pf-chips">
              {w.tags.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="pf-meta">
              <b>{l.role}:</b> {w.role} &nbsp;·&nbsp; <b>{l.year}:</b> {w.year}
            </p>
            <p className="pf-strong">{w.summary}</p>
            {w.description.split("\n\n").map((para, i) => (
              <p className="pf-small" key={i}>
                {para}
              </p>
            ))}
            {w.link && (
              <p className="pf-meta">
                {l.code}: {w.link}
              </p>
            )}
          </div>
        </div>
      ),
    });

    if (w.galleryImages?.length) {
      slides.push({
        title: `${w.title} — ${l.gallery}`,
        kicker: t.projects.title,
        render: () => (
          <div
            className="pf-gallery"
            style={{ gridTemplateColumns: `repeat(${w.galleryImages.length > 4 ? 3 : w.galleryImages.length > 2 ? 2 : w.galleryImages.length}, 1fr)` }}
          >
            {w.galleryImages.map((img, i) => (
              <figure key={img}>
                <Img src={img} fit="contain" />
                <figcaption>{w.gallery?.[i] || ""}</figcaption>
              </figure>
            ))}
          </div>
        ),
      });
    }
  });

  // Sertifikat (6 per slide)
  chunk(certList, 6).forEach((group, idx, all) => {
    slides.push({
      title: `${t.certificates.title}${all.length > 1 ? ` (${idx + 1}/${all.length})` : ""}`,
      kicker: l.portfolio,
      render: () => (
        <div className="pf-certs">
          {group.map((c) => (
            <figure key={c.slug}>
              <Img src={c.image} fit="contain" tone={c.tone} />
              <figcaption>
                <b>{c.title}</b>
                <span>
                  {c.issuer} · {c.year}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ),
    });
  });

  // Kontak
  slides.push({
    title: l.contactTitle,
    kicker: l.portfolio,
    render: () => (
      <div className="pf-contact">
        <p className="pf-lead">{l.contactSub}</p>
        <p className="pf-mail pf-mail-big">{profile.email}</p>
        <div className="pf-socials">
          {profile.socials.map((s) => (
            <div key={s.label}>
              <b>{s.label}</b>
              <span>{s.href.split("?")[0]}</span>
            </div>
          ))}
        </div>
        <p className="pf-thanks">{l.thanks}</p>
      </div>
    ),
  });

  const total = slides.length;

  return (
    <div id="portfolio-print" aria-hidden="true">
      {slides.map((s, i) =>
        s.cover ? (
          <div key={i}>{s.render()}</div>
        ) : (
          <Slide
            key={i}
            title={s.title}
            kicker={s.kicker}
            page={i + 1}
            total={total}
            name={name}
            label={l.portfolio}
          >
            {s.render()}
          </Slide>
        )
      )}
    </div>
  );
}