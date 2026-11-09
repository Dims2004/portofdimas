// Pemisah antar-bab: garis neon + rerenggan Jawa di tengah
export default function Divider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-6xl items-center gap-5 px-6 text-accent-2 sm:px-10"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/40 to-accent-2/60" />
      <span className="font-aksara text-lg tracking-[0.3em]">꧁ ◆ ꧂</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/40 to-accent-2/60" />
    </div>
  );
}
