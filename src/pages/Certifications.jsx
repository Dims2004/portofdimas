import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import CertificateLightbox from "../components/CertificateLightbox";
import { certificates, getCertificate } from "../data/certificates";
import { useLanguage } from "../lib/LanguageContext";
import { withBase } from "../lib/assetPath";

const toneGradients = {
  1: "from-[#4B4238] to-[#C9A24B]",
  2: "from-[#31353A] to-[#7C8B79]",
  3: "from-[#2E2733] to-[#8C6E9C]",
  4: "from-[#3A2E28] to-[#B7754A]",
  5: "from-[#242B2C] to-[#5C8B8A]",
  6: "from-[#332A2A] to-[#A65C4E]",
};

function CertificateCard({ certificate, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(certificate)}
      className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface text-left"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div
        className={`aspect-[4/3] w-full overflow-hidden ${
          certificate.image ? "" : `bg-gradient-to-br ${toneGradients[certificate.tone] ?? toneGradients[1]}`
        } transition-transform duration-500 group-hover:scale-[1.05]`}
      >
        {certificate.image && (
          <img
            src={withBase(certificate.image)}
            alt={certificate.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-6">
        <h3 className="font-serif text-lg text-ink">{certificate.title}</h3>
        <p className="text-sm text-accent-2">{certificate.issuer}</p>
        {certificate.year && <p className="text-sm text-muted">{certificate.year}</p>}
      </div>
    </motion.button>
  );
}

export default function Certifications() {
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState(null);

  const localizedCertificates = certificates.map((c) => getCertificate(c, lang));

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal className="mb-16 max-w-[36ch]">
        <p className="mb-4 text-sm text-accent-2">{t.certifications.eyebrow}</p>
        <h1 className="font-serif text-4xl sm:text-5xl">{t.certifications.heading}</h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {localizedCertificates.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.08}>
            <CertificateCard certificate={c} onOpen={setSelected} />
          </Reveal>
        ))}
      </div>

      <CertificateLightbox certificate={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
