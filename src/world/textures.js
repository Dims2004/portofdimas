import * as THREE from "three";

// ============================================================
// Semua tekstur dibuat prosedural lewat <canvas> — tanpa file gambar.
// ============================================================
export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const sat = (v) => clamp(v, 0, 1);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (e0, e1, x) => {
  const t = sat((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
export const damp = (cur, to, rate, dt) => lerp(cur, to, 1 - Math.exp(-rate * dt));

export function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function cvs(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

/** noise bertingkat (up-scaled value noise) — cepat dan cukup bagus */
export function fbmCanvas(W, H, seed, octaves = 5, baseCells = 3, contrast = 1) {
  const out = cvs(W, H);
  const o = out.getContext("2d");
  o.fillStyle = "#808080";
  o.fillRect(0, 0, W, H);
  let cells = baseCells;
  let alpha = 1;
  for (let i = 0; i < octaves; i++) {
    const n = cvs(cells, cells);
    const nx = n.getContext("2d");
    const im = nx.createImageData(cells, cells);
    const d = im.data;
    const r = mulberry32(seed + i * 977);
    for (let k = 0; k < cells * cells; k++) {
      const v = clamp(128 + (r() - 0.5) * 255 * contrast, 0, 255);
      d[k * 4] = d[k * 4 + 1] = d[k * 4 + 2] = v;
      d[k * 4 + 3] = 255;
    }
    nx.putImageData(im, 0, 0);
    o.globalAlpha = alpha;
    o.globalCompositeOperation = i === 0 ? "source-over" : "overlay";
    o.imageSmoothingEnabled = true;
    o.imageSmoothingQuality = "high";
    o.drawImage(n, 0, 0, W, H);
    cells *= 2;
    alpha *= 0.62;
  }
  o.globalAlpha = 1;
  o.globalCompositeOperation = "source-over";
  return out;
}

export function tex(canvas, o = {}) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = o.wrap || THREE.ClampToEdgeWrapping;
  if (o.repeat) t.repeat.set(o.repeat[0], o.repeat[1]);
  t.anisotropy = o.aniso || 8;
  t.colorSpace = o.srgb === false ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

/* ---------- langit malam: gradasi + bintang + ufuk merah-soga ---------- */
export function texSky() {
  const W = 1024,
    H = 1024,
    c = cvs(W, H),
    x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#03040a");
  g.addColorStop(0.3, "#070a1c");
  g.addColorStop(0.55, "#0e1233");
  g.addColorStop(0.72, "#231238");
  g.addColorStop(0.86, "#4a1530");
  g.addColorStop(1, "#1a0c18");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  x.globalAlpha = 0.28;
  x.globalCompositeOperation = "overlay";
  x.drawImage(fbmCanvas(512, 512, 313, 5, 3, 0.9), 0, 0, W, H);
  x.globalAlpha = 1;
  x.globalCompositeOperation = "source-over";
  const rnd = mulberry32(881);
  for (let i = 0; i < 900; i++) {
    const sx = rnd() * W;
    const sy = rnd() * H * 0.62;
    const r = 0.4 + rnd() * rnd() * 1.5;
    x.fillStyle = `rgba(214,236,255,${((0.15 + rnd() * 0.55) * (1 - sy / (H * 0.7))).toFixed(3)})`;
    x.beginPath();
    x.arc(sx, sy, r, 0, TAU);
    x.fill();
  }
  return c;
}

/* ---------- bulan: dataran gelap (maria) + kawah, diwarnai merah di material ---------- */
export function texMoon() {
  const S = 512,
    c = cvs(S, S),
    x = c.getContext("2d");
  const R = S / 2 - 1;
  const rnd = mulberry32(91);
  x.save();
  x.beginPath();
  x.arc(S / 2, S / 2, R, 0, TAU);
  x.clip();
  const g = x.createRadialGradient(S * 0.46, S * 0.44, S * 0.05, S / 2, S / 2, R);
  g.addColorStop(0, "rgb(150,150,150)");
  g.addColorStop(0.85, "rgb(170,170,170)");
  g.addColorStop(1, "rgb(190,190,190)");
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  x.globalCompositeOperation = "overlay";
  x.globalAlpha = 0.5;
  x.drawImage(fbmCanvas(256, 256, 517, 6, 4, 1.1), 0, 0, S, S);
  x.globalAlpha = 1;
  x.globalCompositeOperation = "source-over";
  const seas = [
    [-0.52, -0.06, 0.46, 0.8],
    [-0.26, -0.38, 0.31, 0.92],
    [0.13, -0.31, 0.2, 0.88],
    [0.3, -0.08, 0.23, 0.84],
    [0.45, 0.12, 0.15, 0.78],
    [-0.27, 0.3, 0.19, 0.7],
    [0.57, -0.3, 0.12, 0.95],
  ];
  const sea = cvs(S, S);
  const sx = sea.getContext("2d");
  seas.forEach(([u, v, rad, dk]) => {
    for (let i = 0; i < 20; i++) {
      const a = rnd() * TAU;
      const off = rnd() * rad * 0.66;
      const bx = S / 2 + (u + Math.cos(a) * off) * R;
      const by = S / 2 + (v + Math.sin(a) * off * 0.8) * R;
      const rr = rad * R * (0.3 + rnd() * 0.46);
      const bg = sx.createRadialGradient(bx, by, rr * 0.2, bx, by, rr);
      bg.addColorStop(0, `rgba(0,0,0,${(dk * 0.14).toFixed(3)})`);
      bg.addColorStop(1, "rgba(0,0,0,0)");
      sx.fillStyle = bg;
      sx.beginPath();
      sx.arc(bx, by, rr, 0, TAU);
      sx.fill();
    }
  });
  x.save();
  x.filter = "blur(9px)";
  x.globalAlpha = 0.9;
  x.drawImage(sea, 0, 0);
  x.restore();
  for (let i = 0; i < 380; i++) {
    const a = rnd() * TAU;
    const rr = Math.sqrt(rnd()) * 0.96;
    const cx = S / 2 + Math.cos(a) * rr * R;
    const cy = S / 2 + Math.sin(a) * rr * R;
    const r = 1 + rnd() * rnd() * rnd() * 14;
    const lg = x.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    lg.addColorStop(0, "rgba(255,255,255,.30)");
    lg.addColorStop(0.5, "rgba(255,255,255,0)");
    lg.addColorStop(1, "rgba(0,0,0,.36)");
    x.strokeStyle = lg;
    x.lineWidth = Math.max(0.8, r * 0.26);
    x.beginPath();
    x.arc(cx, cy, r, 0, TAU);
    x.stroke();
  }
  x.restore();
  const fe = x.createRadialGradient(S / 2, S / 2, R - 2.5, S / 2, S / 2, R);
  fe.addColorStop(0, "rgba(0,0,0,1)");
  fe.addColorStop(1, "rgba(0,0,0,0)");
  x.globalCompositeOperation = "destination-in";
  x.fillStyle = fe;
  x.fillRect(0, 0, S, S);
  x.globalCompositeOperation = "source-over";
  return c;
}

export function texGlow(inner = "rgba(255,255,255,1)", mid = "rgba(255,255,255,.36)") {
  const S = 256,
    c = cvs(S, S),
    x = c.getContext("2d");
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.28, mid);
  g.addColorStop(0.62, "rgba(255,255,255,.07)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  return c;
}

/* ---------- batu candi: butir mineral + goresan pahat ---------- */
export function texStone(seed = 17, base = [44, 48, 62]) {
  const W = 512,
    H = 512,
    c = cvs(W, H),
    x = c.getContext("2d");
  const rnd = mulberry32(seed);
  x.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
  x.fillRect(0, 0, W, H);
  x.globalCompositeOperation = "overlay";
  x.globalAlpha = 0.7;
  x.drawImage(fbmCanvas(W, H, seed + 4, 6, 3, 1), 0, 0);
  x.globalAlpha = 1;
  x.globalCompositeOperation = "source-over";
  for (let i = 0; i < 2600; i++) {
    const s = 0.5 + rnd() * 2.2;
    x.fillStyle = rnd() > 0.5 ? `rgba(200,210,230,${0.04 + rnd() * 0.12})` : `rgba(4,6,12,${0.1 + rnd() * 0.3})`;
    x.beginPath();
    x.ellipse(rnd() * W, rnd() * H, s, s * (0.6 + rnd() * 0.8), rnd() * TAU, 0, TAU);
    x.fill();
  }
  for (let i = 0; i < 130; i++) {
    x.save();
    x.translate(rnd() * W, rnd() * H);
    x.rotate(-0.25 + rnd() * 0.5);
    const len = 6 + rnd() * 26;
    x.fillStyle = "rgba(0,0,0,.22)";
    x.fillRect(0, 0, len, 1.4);
    x.fillStyle = "rgba(190,200,225,.07)";
    x.fillRect(0, 1.4, len, 1);
    x.restore();
  }
  return c;
}

/* ---------- pola emisif relung/relief: garis neon + titik emas ---------- */
export function texTierGlow() {
  const W = 256,
    H = 128,
    c = cvs(W, H),
    x = c.getContext("2d");
  x.fillStyle = "#000";
  x.fillRect(0, 0, W, H);
  x.fillStyle = "rgb(34,229,255)";
  x.fillRect(0, 6, W, 2);
  x.fillRect(0, H - 8, W, 2);
  x.fillStyle = "rgba(34,229,255,.45)";
  x.fillRect(0, 14, W, 1);
  for (let i = 0; i < 8; i++) {
    const px = 16 + i * 32;
    x.strokeStyle = "rgb(245,185,66)";
    x.lineWidth = 2;
    x.strokeRect(px, 32, 16, 52);
    x.fillStyle = "rgba(245,185,66,.55)";
    x.fillRect(px + 5, 44, 6, 26);
    x.fillStyle = "rgb(34,229,255)";
    x.fillRect(px + 6, 92, 4, 4);
  }
  return c;
}

/* ---------- lantai basah: lempeng + sambungan + urat sirkuit ---------- */
export function texFloor() {
  const W = 1024,
    H = 1024,
    c = cvs(W, H),
    x = c.getContext("2d");
  const rnd = mulberry32(23);
  x.fillStyle = "#070a14";
  x.fillRect(0, 0, W, H);
  const N = 4,
    S = W / N;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const t = 0.8 + rnd() * 0.4;
      x.fillStyle = `rgb(${10 * t},${14 * t},${26 * t})`;
      x.fillRect(i * S + 2, j * S + 2, S - 4, S - 4);
    }
  x.globalCompositeOperation = "overlay";
  x.globalAlpha = 0.5;
  x.drawImage(fbmCanvas(W, H, 63, 6, 4, 1), 0, 0);
  x.globalAlpha = 1;
  x.globalCompositeOperation = "source-over";
  x.strokeStyle = "rgba(34,229,255,.38)";
  x.lineWidth = 2;
  for (let i = 0; i <= N; i++) {
    x.beginPath();
    x.moveTo(i * S, 0);
    x.lineTo(i * S, H);
    x.stroke();
    x.beginPath();
    x.moveTo(0, i * S);
    x.lineTo(W, i * S);
    x.stroke();
  }
  /* motif kawung tipis di tengah tiap lempeng */
  x.strokeStyle = "rgba(245,185,66,.16)";
  x.lineWidth = 1.4;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const cx = i * S + S / 2;
      const cy = j * S + S / 2;
      [
        [0, -S * 0.18, S * 0.07, S * 0.16],
        [0, S * 0.18, S * 0.07, S * 0.16],
        [-S * 0.18, 0, S * 0.16, S * 0.07],
        [S * 0.18, 0, S * 0.16, S * 0.07],
      ].forEach(([ox, oy, rx, ry]) => {
        x.beginPath();
        x.ellipse(cx + ox, cy + oy, rx, ry, 0, 0, TAU);
        x.stroke();
      });
    }
  return c;
}

/* ---------- bunga kamboja (5 kelopak) untuk kelopak berjatuhan ---------- */
export function texPetal() {
  const S = 128,
    c = cvs(S, S),
    x = c.getContext("2d");
  x.translate(S / 2, S / 2);
  for (let i = 0; i < 5; i++) {
    x.save();
    x.rotate((i / 5) * TAU);
    const g = x.createLinearGradient(0, 0, 0, -S * 0.46);
    g.addColorStop(0, "rgb(255,214,110)");
    g.addColorStop(0.5, "rgb(255,246,226)");
    g.addColorStop(1, "rgb(255,255,255)");
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(0, 0);
    x.bezierCurveTo(S * 0.2, -S * 0.1, S * 0.2, -S * 0.42, 0, -S * 0.46);
    x.bezierCurveTo(-S * 0.2, -S * 0.42, -S * 0.2, -S * 0.1, 0, 0);
    x.fill();
    x.restore();
  }
  return c;
}

/* ---------- daun bambu: bilah panjang meruncing ---------- */
export function texBlade() {
  const W = 64,
    H = 256,
    c = cvs(W, H),
    x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, "#05140f");
  g.addColorStop(0.5, "#1c4a3a");
  g.addColorStop(1, "#05140f");
  x.fillStyle = g;
  x.beginPath();
  x.moveTo(W / 2, 0);
  x.quadraticCurveTo(W * 1.05, H * 0.35, W / 2, H);
  x.quadraticCurveTo(-W * 0.05, H * 0.35, W / 2, 0);
  x.fill();
  x.strokeStyle = "rgba(34,229,255,.55)";
  x.lineWidth = 1.5;
  x.beginPath();
  x.moveTo(W / 2, 4);
  x.lineTo(W / 2, H - 4);
  x.stroke();
  return c;
}

/* ---------- jejak kursor: titik terang berhalo ---------- */
export function texWisp() {
  const S = 128,
    c = cvs(S, S),
    x = c.getContext("2d");
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.07, "rgba(236,250,250,.92)");
  g.addColorStop(0.16, "rgba(140,232,255,.40)");
  g.addColorStop(0.34, "rgba(34,229,255,.13)");
  g.addColorStop(0.62, "rgba(34,160,200,.035)");
  g.addColorStop(1, "rgba(34,160,200,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  return c;
}
