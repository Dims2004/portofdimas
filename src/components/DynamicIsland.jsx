import { useEffect, useRef, useState } from "react";
import { withBase } from "../lib/assetPath";
import { songs } from "../data/music";

export default function DynamicIsland() {
  const audioRef = useRef(null);
  const resume = useRef(false); // lanjut memutar otomatis saat ganti lagu
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState(false);
  const song = songs[i];

  // ganti lagu -> muat ulang, putar kalau sebelumnya sedang diputar
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    setProgress(0);
    if (resume.current) a.play().catch(() => setErr(true));
  }, [i]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    setErr(false);
    if (a.paused) a.play().catch(() => setErr(true));
    else a.pause();
  };

  const go = (n) => {
    resume.current = playing || resume.current;
    setErr(false);
    setI((n + songs.length) % songs.length);
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = (Number(e.target.value) / 100) * a.duration;
  };

  return (
    <div className={`island ${open ? "open" : ""} ${playing ? "playing" : ""}`}>
      <audio
        ref={audioRef}
        src={withBase(song.file)}
        preload="none"
        onPlay={() => { resume.current = true; setPlaying(true); }}
        onPause={() => { resume.current = false; setPlaying(false); }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
        }}
        onEnded={() => { resume.current = true; go(i + 1); }}
        onError={() => setErr(true)}
      />

      <button type="button" className="island-main" aria-expanded={open} aria-label="Pemutar musik" onClick={() => setOpen((v) => !v)}>
        <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="island-title">{song.title}</span>
      </button>

      <div className="island-panel">
        <div className="island-inner">
          <p className="island-artist">{err ? "File musik belum ditemukan" : song.artist}</p>
          <input className="island-seek" type="range" min="0" max="100" step="0.1" value={progress} onChange={seek} aria-label="Posisi lagu" />
          <div className="island-ctrl">
            <button type="button" onClick={() => go(i - 1)} aria-label="Lagu sebelumnya"><i className="bi bi-skip-start-fill" /></button>
            <button type="button" className="island-play" onClick={toggle} aria-label={playing ? "Jeda" : "Putar"}>
              <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Lagu berikutnya"><i className="bi bi-skip-end-fill" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}