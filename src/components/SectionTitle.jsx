import Reveal from "./Reveal";

export default function SectionTitle({ title, sub }) {
  return (
    <Reveal className="container section-title">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}
