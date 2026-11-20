import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";

// ============================================================
// Tombol "Kirim Email" dengan pilihan aplikasi:
//  - Aplikasi email : mailto: (membuka Gmail/Outlook yang terpasang)
//  - Gmail / Outlook: layar tulis email di tab baru
// Penerima & subjek terisi otomatis.
// ============================================================
const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

export default function EmailChooser({ className = "", children }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const f = t.footer;

  const to = encodeURIComponent(profile.email);
  const su = encodeURIComponent(f.mailSubject ?? "");

  const options = [
    { key: "app", icon: "bi-envelope-open", title: f.emailApp, desc: f.emailAppDesc, href: `mailto:${profile.email}?subject=${su}`, external: false },
    { key: "gmail", icon: "bi-google", title: "Gmail", desc: f.gmailDesc, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}`, external: true },
    { key: "outlook", icon: "bi-microsoft", title: "Outlook", desc: f.outlookDesc, href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}`, external: true },
  ];
  // HP: aplikasi email dulu. PC: Gmail & Outlook dulu.
  const ordered = isTouchDevice() ? options : [options[1], options[2], options[0]];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
    };
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {children}
      </button>
      {open &&
        createPortal(
          <div className="modal-bg" onClick={() => setOpen(false)}>
            <div className="modal-card" role="dialog" aria-modal="true" aria-label={f.emailChooseTitle} onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <div>
                  <h3>{f.emailChooseTitle}</h3>
                  <p>{profile.email}</p>
                </div>
                <button type="button" className="modal-x" aria-label={f.close} onClick={() => setOpen(false)}>
                  <i className="bi bi-x-lg" />
                </button>
              </div>
              <ul>
                {ordered.map((o) => (
                  <li key={o.key}>
                    <a
                      href={o.href}
                      {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onClick={() => setOpen(false)}
                    >
                      <i className={`bi ${o.icon}`} />
                      <span>
                        <strong>{o.title}</strong>
                        <small>{o.desc}</small>
                      </span>
                      <i className="bi bi-chevron-right go" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
