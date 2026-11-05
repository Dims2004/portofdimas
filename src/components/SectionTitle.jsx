import Reveal from "./Reveal";

// Judul section: teks tebal besar + garis pendek di bawahnya
export default function SectionTitle({ children, className = "" }) {
  return (
    <Reveal className={`mb-12 ${className}`}>
      <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {children}
      </h2>
      <span className="mt-4 block h-[3px] w-14 rounded-full bg-white" />
    </Reveal>
  );
}
