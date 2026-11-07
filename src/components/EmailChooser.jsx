import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { profile } from "../data/profile";

// ============================================================
// Tombol "Kirim Email" dengan pilihan aplikasi:
//  - Aplikasi email : memakai mailto: -> HP/PC akan membuka aplikasi email
//                     yang terpasang (Gmail, Outlook, dll) atau menampilkan
//                     pilihan aplikasi bila ada lebih dari satu.
//  - Gmail          : layar tulis email Gmail (tab baru / app Gmail)
//  - Outlook        : layar tulis email Outlook (tab baru)
// Penerima & subjek terisi otomatis.
// ============================================================

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(pointer: coarse)").matches;

function Icon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "app")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7.5 8 6 8-6" />
      </svg>
    );
  if (name === "gmail")
    return (
      <svg {...common}>
        <path d="M3 7.5v10a1.5 1.5 0 0 0 1.5 1.5H7V10.5l5 3.8 5-3.8V19h2.5a1.5 1.5 0 0 0 1.5-1.5v-10L19.4 5.9a1.7 1.7 0 0 0-2 0L12 10 6.6 5.9a1.7 1.7 0 0 0-2 0L3 7.5Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="2.5" y="6" width="11" height="12" rx="2" />
      <circle cx="8" cy="12" r="2.3" />
      <path d="M13.5 8.5H20a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 20 17.5h-6.5" />
      <path d="m14 10.5 4 2.5 3.5-2.2" />
    </svg>
  );
}

export default function EmailChooser({ className = "", children }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const f = t.footer;

  const to = encodeURIComponent(profile.email);
  const su = encodeURIComponent(f.mailSubject ?? "");

  const mailtoUrl = `mailto:${profile.email}?subject=${su}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}`;

  const options = [
    {
      key: "app",
      icon: "app",
      title: f.emailApp ?? "Email app",
      desc: f.emailAppDesc ?? "Gmail, Outlook, or other apps on your device",
      href: mailtoUrl,
      external: false,
    },
    {
      key: "gmail",
      icon: "gmail",
      title: "Gmail",
      desc: f.gmailDesc ?? "Compose in Gmail",
      href: gmailUrl,
      external: true,
    },
    {
      key: "outlook",
      icon: "outlook",
      title: "Outlook",
      desc: f.outlookDesc ?? "Compose in Outlook",
      href: outlookUrl,
      external: true,
    },
  ];

  // Di HP, "Aplikasi email" paling atas (membuka app Gmail/Outlook yang terpasang)
  // Di PC, Gmail & Outlook dulu karena belum tentu ada aplikasi email terpasang
  const ordered = isTouchDevice()
    ? options
    : [options[1], options[2], options[0]];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={f.emailChooseTitle ?? "Send via"}
                className="w-full max-w-md rounded-3xl border border-white/15 bg-[#160a2b] p-5 shadow-2xl"
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {f.emailChooseTitle ?? "Send via"}
                    </h3>
                    <p className="mt-0.5 break-all text-xs text-white/60">
                      {profile.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={f.close ?? "Close"}
                    className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {ordered.map((o) => (
                    <a
                      key={o.key}
                      href={o.href}
                      {...(o.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/10 text-accent-2">
                        <Icon name={o.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">
                          {o.title}
                        </span>
                        <span className="block text-xs text-white/60">
                          {o.desc}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
