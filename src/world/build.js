import * as THREE from "three";
import {
  TAU, mulberry32, cvs, tex, texSky, texMoon, texGlow, texStone, texTierGlow,
  texFloor, texPetal, texBlade, texWisp, clamp, lerp, smooth, damp,
} from "./textures";

// ============================================================
// Denah situs (satuan meter). Semua penempatan kamera mengacu ke sini.
// ============================================================
export const SITE = {
  CANDI_Z: -44, // titik pusat candi
  STAIR_Z0: -12, // anak tangga paling bawah
  STEPS: 48,
  RISE: 0.25,
  RUN: 0.5,
  STAIR_W: 5.4,
  BENTAR_Z: -8, // gerbang candi bentar
  BENTAR_GAP: 3.5, // setengah lebar bukaan gerbang
};
const TOP = SITE.STEPS * SITE.RISE; // 12 m

const hdr = (r, g, b) => new THREE.Color().setRGB(r, g, b);
const CYAN = 0xb4cfc6;
const GOLD = 0xe0a24a;

/** garis tepi neon pada sebuah mesh */
function neonEdges(mesh, color = CYAN, opacity = 0.7, angle = 20) {
  const l = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry, angle),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
  mesh.add(l);
  return l;
}

/* --------------------------------------------------------- langit + bulan */
export function buildSky(ctx) {
  const { scene } = ctx;
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(260, 32, 24),
    new THREE.MeshBasicMaterial({ map: tex(texSky()), side: THREE.BackSide, fog: false, depthWrite: false })
  );
  sky.renderOrder = -10;
  scene.add(sky);
  ctx.sky = sky;

  /* bulan merah */
  const MOON = { x: 17, y: 36, z: -120, r: 12 };
  const disc = new THREE.Mesh(
    new THREE.PlaneGeometry(MOON.r * 2, MOON.r * 2),
    new THREE.MeshBasicMaterial({
      map: tex(texMoon()), color: hdr(3.2, 0.3, 0.26), transparent: true,
      depthWrite: false, fog: false, toneMapped: false,
    })
  );
  disc.position.set(MOON.x, MOON.y, MOON.z);
  scene.add(disc);
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(MOON.r * 7, MOON.r * 7),
    new THREE.MeshBasicMaterial({
      map: tex(texGlow("rgba(255,110,100,.9)", "rgba(210,40,50,.28)")), transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, fog: false, opacity: 0.5,
    })
  );
  halo.position.set(MOON.x, MOON.y, MOON.z - 0.4);
  scene.add(halo);
  ctx.moon = disc;
  ctx.moonHalo = halo;
  ctx.MOON = MOON;
}

/* ------------------------------------------- gunung (Merapi) + punggung bukit */
export function buildMountains(ctx) {
  const { scene } = ctx;
  const mat = new THREE.MeshBasicMaterial({ color: 0x070a18, fog: true });
  /* gunung berapi: kerucut dengan puncak sedikit terpotong */
  const volcano = new THREE.Mesh(new THREE.ConeGeometry(70, 52, 7, 1, false), mat);
  volcano.position.set(-62, 22, -170);
  volcano.rotation.y = 0.4;
  scene.add(volcano);
  const rim = new THREE.LineSegments(
    new THREE.EdgesGeometry(volcano.geometry, 5),
    new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.18, fog: true })
  );
  volcano.add(rim);
  const ridge = new THREE.Mesh(new THREE.ConeGeometry(60, 30, 6), mat);
  ridge.position.set(70, 9, -150);
  scene.add(ridge);
  const ridge2 = new THREE.Mesh(new THREE.ConeGeometry(48, 24, 6), mat);
  ridge2.position.set(10, 6, -175);
  scene.add(ridge2);
}

/* ------------------------------------------------------------ lantai */
export function buildGround(ctx) {
  const { scene } = ctx;
  const t = tex(texFloor(), { wrap: THREE.RepeatWrapping, repeat: [14, 14], aniso: 16 });
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 240),
    new THREE.MeshStandardMaterial({ map: t, color: 0x4c5559, roughness: 0.8, metalness: 0.04 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -40);
  scene.add(floor);
  const grid = new THREE.GridHelper(240, 80, CYAN, CYAN);
  grid.material.transparent = true;
  grid.material.opacity = 0.07;
  grid.position.set(0, 0.03, -40);
  scene.add(grid);
}

/* ------------------------------------------------------------ candi */
function tierMaterial(w, h, stoneMap) {
  const glow = tex(texTierGlow(), { wrap: THREE.RepeatWrapping, repeat: [Math.max(1, w / 7), 1], srgb: true });
  return new THREE.MeshStandardMaterial({
    map: stoneMap, color: 0xa3aaa8, roughness: 0.82, metalness: 0.06,
    emissive: 0xffffff, emissiveMap: glow, emissiveIntensity: 0.55,
  });
}

export function buildCandi(ctx) {
  const { scene } = ctx;
  const g = new THREE.Group();
  const stoneMap = tex(texStone(17), { wrap: THREE.RepeatWrapping, repeat: [3, 1.5] });
  const stone = new THREE.MeshStandardMaterial({ map: stoneMap, color: 0xa3aaa8, roughness: 0.85, metalness: 0.05 });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0x3a2a10, emissive: GOLD, emissiveIntensity: 0.5, roughness: 0.5, metalness: 0.5,
  });
  const cz = SITE.CANDI_Z;

  /* empat teras persegi */
  const tiers = [
    { w: 34, h: 3 }, { w: 28, h: 3 }, { w: 22, h: 3 }, { w: 16, h: 3 },
  ];
  let y = 0;
  tiers.forEach((t) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(t.w, t.h, t.w), tierMaterial(t.w, t.h, stoneMap));
    m.position.set(0, y + t.h / 2, cz);
    neonEdges(m, CYAN, 0.75);
    g.add(m);
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(t.w + 0.5, 0.22, t.w + 0.5), goldMat);
    cornice.position.set(0, y + t.h + 0.11, cz);
    g.add(cornice);
    y += t.h;
  });

  /* tiga teras bundar + stupa kecil berlubang */
  const rings = [
    { r: 6.2, h: 1.6, n: 16, sr: 0.62 },
    { r: 4.6, h: 1.2, n: 12, sr: 0.58 },
    { r: 3.1, h: 1.0, n: 8, sr: 0.54 },
  ];
  const stupaGeo = new THREE.SphereGeometry(1, 20, 12, 0, TAU, 0, Math.PI / 2);
  const total = rings.reduce((a, r) => a + r.n, 0);
  const stupas = new THREE.InstancedMesh(stupaGeo, stone, total);
  const bands = new THREE.InstancedMesh(
    new THREE.TorusGeometry(1, 0.045, 6, 28),
    new THREE.MeshBasicMaterial({ color: hdr(0.2, 1.1, 1.3), toneMapped: false }),
    total
  );
  const tips = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.1, 8, 6),
    new THREE.MeshBasicMaterial({ color: hdr(2.4, 1.6, 0.4), toneMapped: false }),
    total
  );
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const V = new THREE.Vector3();
  const S = new THREE.Vector3();
  let k = 0;
  rings.forEach((rg, ri) => {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(rg.r + 0.7, rg.r + 0.8, rg.h, 48), stone);
    disc.position.set(0, y + rg.h / 2, cz);
    g.add(disc);
    const edge = new THREE.Mesh(
      new THREE.TorusGeometry(rg.r + 0.78, 0.05, 6, 80),
      new THREE.MeshBasicMaterial({ color: hdr(0.2, 1.0, 1.25), toneMapped: false })
    );
    edge.rotation.x = Math.PI / 2;
    edge.position.set(0, y + rg.h, cz);
    g.add(edge);
    const top = y + rg.h;
    for (let i = 0; i < rg.n; i++) {
      const a = (i / rg.n) * TAU + ri * 0.2;
      const px = Math.cos(a) * rg.r;
      const pz = cz + Math.sin(a) * rg.r;
      S.set(rg.sr, rg.sr * 0.95, rg.sr);
      M.compose(V.set(px, top, pz), Q.identity(), S);
      stupas.setMatrixAt(k, M);
      S.set(rg.sr * 0.98, rg.sr * 0.98, rg.sr * 0.98);
      Q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      M.compose(V.set(px, top + 0.06, pz), Q, S);
      bands.setMatrixAt(k, M);
      Q.identity();
      S.set(1, 1, 1);
      M.compose(V.set(px, top + rg.sr * 0.95 + 0.04, pz), Q, S);
      tips.setMatrixAt(k, M);
      k++;
    }
    y += rg.h;
  });
  stupas.castShadow = false;
  g.add(stupas, bands, tips);

  /* stupa induk */
  const mainStupa = new THREE.Group();
  mainStupa.position.set(0, y, cz);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 0.5, 40), stone);
  base.position.y = 0.25;
  const bell = new THREE.Mesh(new THREE.SphereGeometry(2.7, 36, 20, 0, TAU, 0, Math.PI / 2), stone);
  bell.position.y = 0.5;
  mainStupa.add(base, bell);
  const bellRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.72, 0.07, 8, 60),
    new THREE.MeshBasicMaterial({ color: hdr(0.2, 1.1, 1.3), toneMapped: false })
  );
  bellRing.rotation.x = Math.PI / 2;
  bellRing.position.y = 0.55;
  mainStupa.add(bellRing);
  const harmika = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 1.5), goldMat);
  harmika.position.y = 3.35;
  mainStupa.add(harmika);
  let sy = 3.9;
  [1.1, 0.9, 0.7, 0.5, 0.34].forEach((r, i) => {
    const d = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.08, 0.22, 24), goldMat);
    d.position.y = sy + i * 0.5;
    mainStupa.add(d);
  });
  const finial = new THREE.Mesh(
    new THREE.ConeGeometry(0.16, 1.4, 12),
    new THREE.MeshBasicMaterial({ color: hdr(3, 2, 0.5), toneMapped: false })
  );
  finial.position.y = sy + 5 * 0.5 + 0.4;
  mainStupa.add(finial);
  g.add(mainStupa);
  ctx.candiTop = y + 8;
  scene.add(g);
  ctx.candi = g;
}

/* ----------------------------------------------- tangga agung + lampu */
export function buildStair(ctx) {
  const { scene } = ctx;
  const stoneMap = tex(texStone(31), { wrap: THREE.RepeatWrapping, repeat: [1, 1] });
  const stone = new THREE.MeshStandardMaterial({ map: stoneMap, color: 0x98a09e, roughness: 0.85, metalness: 0.05 });
  const N = SITE.STEPS;
  const steps = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), stone, N);
  const nosing = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: hdr(0.25, 1.4, 1.7), toneMapped: false }),
    N
  );
  const cheeks = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), stone, N * 2);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const V = new THREE.Vector3();
  const S = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    const top = (i + 1) * SITE.RISE;
    const z = SITE.STAIR_Z0 - (i + 0.5) * SITE.RUN;
    M.compose(V.set(0, top / 2, z), Q, S.set(SITE.STAIR_W, top, SITE.RUN + 0.02));
    steps.setMatrixAt(i, M);
    M.compose(V.set(0, top + 0.012, z + SITE.RUN / 2 - 0.03), Q, S.set(SITE.STAIR_W, 0.03, 0.05));
    nosing.setMatrixAt(i, M);
    [-1, 1].forEach((s, j) => {
      const h = top + 0.9;
      M.compose(V.set(s * (SITE.STAIR_W / 2 + 0.4), h / 2, z), Q, S.set(0.8, h, SITE.RUN + 0.02));
      cheeks.setMatrixAt(i * 2 + j, M);
    });
  }
  scene.add(steps, nosing, cheeks);

  /* lampu obor di sepanjang tangga */
  ctx.lamps = [];
  const glowMat = new THREE.MeshBasicMaterial({
    map: tex(texGlow("rgba(255,170,70,.95)", "rgba(255,110,30,.30)")), transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.8,
  });
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x1a1e30, roughness: 0.7, metalness: 0.2 });
  const flameMat = new THREE.MeshBasicMaterial({ color: hdr(3.2, 1.5, 0.35), toneMapped: false });
  [4, 12, 20, 28, 36, 44].forEach((i) => {
    const top = (i + 1) * SITE.RISE + 0.9;
    const z = SITE.STAIR_Z0 - (i + 0.5) * SITE.RUN;
    [-1, 1].forEach((s) => {
      const gp = new THREE.Group();
      gp.position.set(s * (SITE.STAIR_W / 2 + 0.4), top, z);
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.5, 0.42), pillarMat);
      p.position.y = 0.75;
      neonEdges(p, GOLD, 0.65);
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.3, 8), pillarMat);
      cup.position.y = 1.65;
      const flame = new THREE.Mesh(new THREE.OctahedronGeometry(0.17, 0), flameMat);
      flame.position.y = 1.98;
      flame.scale.set(1, 1.7, 1);
      const sp = new THREE.Sprite(glowMat);
      sp.scale.set(3.2, 3.2, 1);
      sp.position.y = 1.98;
      gp.add(p, cup, flame, sp);
      scene.add(gp);
      ctx.lamps.push({ flame, sprite: sp, seed: Math.random() * 10 });
    });
  });
}

/* --------------------------------------------- candi bentar (gerbang belah) */
export function buildBentar(ctx) {
  const { scene } = ctx;
  const stoneMap = tex(texStone(53), { wrap: THREE.RepeatWrapping, repeat: [2, 2] });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0x3a2a10, emissive: GOLD, emissiveIntensity: 0.55, roughness: 0.5, metalness: 0.5,
  });
  const layers = [
    { w: 3.8, h: 2.6 }, { w: 3.3, h: 2.1 }, { w: 2.8, h: 1.8 }, { w: 2.3, h: 1.5 }, { w: 1.8, h: 1.2 },
  ];
  [-1, 1].forEach((s) => {
    let y = 0;
    layers.forEach((l) => {
      /* sisi dalam rata (gerbang belah), sisi luar bertingkat */
      const cx = s * (SITE.BENTAR_GAP + l.w / 2);
      const m = new THREE.Mesh(new THREE.BoxGeometry(l.w, l.h, l.w), tierMaterial(l.w, l.h, stoneMap));
      m.position.set(cx, y + l.h / 2, SITE.BENTAR_Z);
      neonEdges(m, CYAN, 0.8);
      scene.add(m);
      const c = new THREE.Mesh(new THREE.BoxGeometry(l.w + 0.4, 0.2, l.w + 0.4), goldMat);
      c.position.set(cx, y + l.h + 0.1, SITE.BENTAR_Z);
      scene.add(c);
      y += l.h;
    });
    const fin = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 1.4, 4),
      new THREE.MeshBasicMaterial({ color: hdr(3, 2, 0.5), toneMapped: false })
    );
    fin.position.set(s * (SITE.BENTAR_GAP + layers[layers.length - 1].w / 2), y + 1.0, SITE.BENTAR_Z);
    fin.rotation.y = Math.PI / 4;
    scene.add(fin);
  });
}

/* ------------------------------------------------ gunungan (kayon) wayang */
export function buildGunungan(ctx) {
  const { scene } = ctx;
  const k = 0.045;
  const X = (x) => (x - 100) * k;
  const Y = (y) => (280 - y) * k;
  const shape = new THREE.Shape();
  shape.moveTo(X(100), Y(6));
  const bz = (a, b, c, d, e, f) => shape.bezierCurveTo(X(a), Y(b), X(c), Y(d), X(e), Y(f));
  bz(84, 40, 64, 52, 52, 84);
  bz(40, 116, 22, 128, 22, 172);
  bz(22, 226, 58, 270, 100, 274);
  bz(142, 270, 178, 226, 178, 172);
  bz(178, 128, 160, 116, 148, 84);
  bz(136, 52, 116, 40, 100, 6);
  const hole = new THREE.Path();
  hole.moveTo(X(80), Y(262));
  hole.lineTo(X(80), Y(206));
  hole.bezierCurveTo(X(80), Y(182), X(120), Y(182), X(120), Y(206));
  hole.lineTo(X(120), Y(262));
  hole.lineTo(X(80), Y(262));
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.45, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 1, curveSegments: 20 });
  geo.translate(0, 0, -0.22);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: 0x14142a, roughness: 0.55, metalness: 0.4, emissive: 0x2a1a05, emissiveIntensity: 0.6 })
  );
  neonEdges(mesh, GOLD, 0.95, 25);
  /* relief pohon kehidupan di muka */
  const line = (pts, color = GOLD) => {
    const l = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts.map(([x, y]) => new THREE.Vector3(X(x), Y(y), 0.3))),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
    );
    mesh.add(l);
  };
  line([[100, 36], [100, 176]]);
  const curve = (p0, p1, p2, p3) => {
    const c = new THREE.CubicBezierCurve3(
      new THREE.Vector3(X(p0[0]), Y(p0[1]), 0.3), new THREE.Vector3(X(p1[0]), Y(p1[1]), 0.3),
      new THREE.Vector3(X(p2[0]), Y(p2[1]), 0.3), new THREE.Vector3(X(p3[0]), Y(p3[1]), 0.3)
    );
    const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(14)),
      new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.9 }));
    mesh.add(l);
  };
  curve([100, 82], [82, 82], [70, 94], [66, 110]);
  curve([100, 82], [118, 82], [130, 94], [134, 110]);
  curve([100, 118], [80, 118], [66, 132], [62, 150]);
  curve([100, 118], [120, 118], [134, 132], [138, 150]);
  mesh.position.set(-19, 0.2, -30);
  mesh.rotation.y = 0.55;
  mesh.scale.setScalar(1.05);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex(texGlow("rgba(245,185,66,.55)", "rgba(245,150,40,.16)")), transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(18, 18, 1);
  glow.position.set(0, 6, -1);
  mesh.add(glow);
  scene.add(mesh);
  ctx.gunungan = mesh;
}

/* ------------------------------------------------------------- bambu */
export function buildBamboo(ctx) {
  const { scene, quality } = ctx;
  const rnd = mulberry32(404);
  const stalkGeo = new THREE.CylinderGeometry(0.11, 0.15, 1, 8, 48, true);
  const p = stalkGeo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const t = (p.getY(i) + 0.5) * 17;
    const f = t - Math.floor(t);
    const d = Math.min(f, 1 - f);
    const bump = 1 + 0.38 * Math.exp(-Math.pow(d * 9, 2));
    p.setX(i, p.getX(i) * bump);
    p.setZ(i, p.getZ(i) * bump);
  }
  stalkGeo.computeVertexNormals();

  const swayChunk = (hExpr, amp) =>
    `#include <begin_vertex>
     float hh = ${hExpr};
     float ph = uTime*0.7 + instanceMatrix[3].x*0.45 + instanceMatrix[3].z*0.3;
     transformed.x += sin(ph)*hh*hh*${amp.toFixed(2)};
     transformed.z += cos(ph*0.8)*hh*hh*${(amp * 0.5).toFixed(2)};`;

  const stalkMat = new THREE.MeshStandardMaterial({
    color: 0x1b3a30, roughness: 0.5, metalness: 0.15, emissive: 0x0b3a35, emissiveIntensity: 0.55,
  });
  stalkMat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = ctx.uTime;
    sh.vertexShader = "uniform float uTime;\n" + sh.vertexShader.replace("#include <begin_vertex>", swayChunk("(position.y + 0.5)", 1.0));
  };
  const leafMat = new THREE.MeshStandardMaterial({
    map: tex(texBlade()), alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.6,
    emissive: 0x0b3a35, emissiveIntensity: 0.7, color: 0x6fb89c,
  });
  leafMat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = ctx.uTime;
    sh.vertexShader = "uniform float uTime;\n" + sh.vertexShader.replace("#include <begin_vertex>", swayChunk("clamp(instanceMatrix[3].y/19.0,0.0,1.0)", 1.0));
  };

  const spots = [];
  const place = (xMin, xMax, zMin, zMax, n) => {
    for (let i = 0; i < n; i++)
      spots.push({ x: lerp(xMin, xMax, rnd()), z: lerp(zMin, zMax, rnd()), h: 15 + rnd() * 8, r: 0.9 + rnd() * 0.5 });
  };
  const per = quality === "low" ? 10 : 18;
  place(-17, -8.5, 10, -34, per);
  place(8.5, 17, 10, -34, per);
  place(-26, -14, -34, -60, 8);
  place(14, 26, -34, -60, 8);
  const stalks = new THREE.InstancedMesh(stalkGeo, stalkMat, spots.length);
  const LEAVES = 12;
  const leaves = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.34, 2.3), leafMat, spots.length * LEAVES);
  const M = new THREE.Matrix4();
  const Q = new THREE.Quaternion();
  const E = new THREE.Euler();
  const V = new THREE.Vector3();
  const S = new THREE.Vector3();
  let li = 0;
  spots.forEach((s, i) => {
    M.compose(V.set(s.x, s.h / 2, s.z), Q.identity(), S.set(s.r, s.h, s.r));
    stalks.setMatrixAt(i, M);
    for (let j = 0; j < LEAVES; j++) {
      const y = s.h * (0.7 + rnd() * 0.3);
      E.set((rnd() - 0.5) * 1.2, rnd() * TAU, (rnd() - 0.5) * 2.2);
      Q.setFromEuler(E);
      const sc = 0.8 + rnd() * 0.7;
      M.compose(V.set(s.x + (rnd() - 0.5) * 0.6, y, s.z + (rnd() - 0.5) * 0.6), Q, S.set(sc, sc, sc));
      leaves.setMatrixAt(li++, M);
    }
  });
  stalks.frustumCulled = leaves.frustumCulled = false;
  scene.add(stalks, leaves);
}

/* ------------------------------------------------------- lampu & cahaya */
export function buildLights(ctx) {
  const { scene } = ctx;
  scene.add(new THREE.HemisphereLight(0x53838f, 0x0a0a0c, 0.8));
  const moonKey = new THREE.DirectionalLight(0xff6a70, 1.0);
  moonKey.position.set(30, 40, -110);
  moonKey.target.position.set(0, 6, -40);
  scene.add(moonKey, moonKey.target);
  const cool = new THREE.DirectionalLight(0xb6dbe4, 1.1);
  cool.position.set(-18, 26, 24);
  cool.target.position.set(0, 4, -30);
  scene.add(cool, cool.target);
  ctx.hot = [];
  [
    [0, 3.2, -4, 90],
    [0, 7.5, -24, 120],
    [0, 17, -40, 200],
  ].forEach(([x, y, z, i]) => {
    const l = new THREE.PointLight(0xff9a3c, i, 42, 2);
    l.position.set(x, y, z);
    scene.add(l);
    ctx.hot.push({ l, base: i });
  });
}

/* ------------------------------------------------ kabut, partikel, kelopak */
export function buildAtmosphere(ctx) {
  const { scene, quality } = ctx;
  const rnd = mulberry32(66);
  const hazeTex = tex(texGlow("rgba(150,178,190,.5)", "rgba(104,138,154,.16)"));
  ctx.haze = [];
  for (let i = 0; i < (quality === "low" ? 5 : 9); i++) {
    const s = 14 + rnd() * 18;
    const h = new THREE.Mesh(
      new THREE.PlaneGeometry(s, s * 0.5),
      new THREE.MeshBasicMaterial({
        map: hazeTex, transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, opacity: 0.05 + rnd() * 0.07,
      })
    );
    h.position.set((rnd() - 0.5) * 60, 1 + rnd() * 12, 8 - rnd() * 70);
    h.userData = { sp: 0.05 + rnd() * 0.1, ph: rnd() * TAU, x0: h.position.x };
    scene.add(h);
    ctx.haze.push(h);
  }

  /* partikel data: naik pelan, cyan + emas */
  const N = quality === "low" ? 260 : 560;
  const pos = new Float32Array(N * 3);
  const seed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (rnd() - 0.5) * 50;
    pos[i * 3 + 1] = rnd() * 24;
    pos[i * 3 + 2] = 14 - rnd() * 70;
    seed[i] = rnd();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  const motes = new THREE.Points(
    g,
    new THREE.ShaderMaterial({
      uniforms: { uTime: ctx.uTime, uTex: { value: tex(texGlow("rgba(255,255,255,1)", "rgba(255,255,255,.35)")) }, uSize: ctx.uPx },
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      vertexShader: `attribute float aSeed; uniform float uTime; uniform float uSize; varying float vA; varying float vS;
        void main(){ vec3 p = position;
          p.y = mod(p.y + uTime*(0.25+aSeed*0.5), 26.0);
          p.x += sin(uTime*0.4 + aSeed*22.0)*0.9; p.z += cos(uTime*0.3 + aSeed*17.0)*0.8;
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          vA = (0.3+aSeed*0.7) * smoothstep(26.0,18.0,p.y) * smoothstep(0.0,2.0,p.y); vS = aSeed;
          gl_PointSize = uSize*(0.010+aSeed*0.020)/max(-mv.z,0.8);
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uTex; varying float vA; varying float vS;
        void main(){ vec4 t = texture2D(uTex, gl_PointCoord);
          vec3 c = mix(vec3(0.2,0.9,1.0), vec3(1.0,0.72,0.26), step(0.8, vS));
          gl_FragColor = vec4(c*t.rgb*1.8, t.a*vA*0.85); }`,
    })
  );
  motes.frustumCulled = false;
  scene.add(motes);

  /* kelopak kamboja berjatuhan */
  const NP = quality === "low" ? 90 : 220;
  const petals = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.34, 0.34),
    new THREE.MeshBasicMaterial({ map: tex(texPetal()), alphaTest: 0.35, side: THREE.DoubleSide, color: 0xffe9c8, fog: true }),
    NP
  );
  petals.frustumCulled = false;
  const list = [];
  for (let i = 0; i < NP; i++)
    list.push({
      x: (rnd() - 0.5) * 50, z: 12 - rnd() * 60, y: rnd() * 22,
      fall: 0.4 + rnd() * 0.7, sway: 0.4 + rnd() * 1.4, ph: rnd() * TAU, amp: 0.3 + rnd() * 0.9,
      roll: rnd() * TAU, rs: 0.5 + rnd() * 2, tilt: rnd() * TAU, ts: (rnd() - 0.5) * 2.4, s: 0.6 + rnd() * 0.9,
    });
  scene.add(petals);
  ctx.petals = { mesh: petals, list };
}

const _M = new THREE.Matrix4();
const _Q = new THREE.Quaternion();
const _E = new THREE.Euler();
const _P = new THREE.Vector3();
const _S = new THREE.Vector3();
const _F = new THREE.Vector3();
export function updatePetals(ctx, dt, t) {
  const pt = ctx.petals;
  if (!pt) return;
  const cam = ctx.camera;
  cam.getWorldDirection(_F);
  _F.y = 0;
  if (_F.lengthSq() < 1e-6) _F.set(0, 0, -1);
  _F.normalize();
  const fx = cam.position.x + _F.x * 10;
  const fz = cam.position.z + _F.z * 10;
  const cy = cam.position.y;
  pt.list.forEach((p, i) => {
    p.y -= p.fall * dt;
    p.roll += p.rs * dt;
    p.tilt += p.ts * dt;
    if (p.y < cy - 9) {
      p.y = cy + 14;
      const a = Math.random() * TAU;
      const r = Math.sqrt(Math.random()) * 12;
      p.x = fx + Math.cos(a) * r;
      p.z = fz + Math.sin(a) * r;
    }
    const sw = Math.sin(t * p.sway + p.ph);
    _P.set(p.x + sw * p.amp, p.y, p.z + Math.cos(t * p.sway * 0.7 + p.ph) * p.amp * 0.6);
    _E.set(p.roll, p.tilt, sw * 0.5);
    _Q.setFromEuler(_E);
    _S.setScalar(p.s);
    _M.compose(_P, _Q, _S);
    pt.mesh.setMatrixAt(i, _M);
  });
  pt.mesh.instanceMatrix.needsUpdate = true;
}

/* -------------------------------------------- jejak cahaya mengikuti kursor */
export function buildWisps(ctx) {
  if (ctx.coarse) return;
  const { camera } = ctx;
  const N = ctx.quality === "low" ? 80 : 170;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
  g.setAttribute("aA", new THREE.BufferAttribute(new Float32Array(N), 1));
  g.setAttribute("aS", new THREE.BufferAttribute(new Float32Array(N), 1));
  const pts = new THREE.Points(
    g,
    new THREE.ShaderMaterial({
      uniforms: { uTex: { value: tex(texWisp()) }, uPx: ctx.uPx },
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, fog: false,
      vertexShader: `attribute float aA; attribute float aS; uniform float uPx; varying float vA;
        void main(){ vA = aA; vec4 mv = modelViewMatrix * vec4(position,1.0);
          gl_PointSize = uPx * aS / max(-mv.z, 0.4); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uTex; varying float vA;
        void main(){ if (vA <= 0.0) discard; vec4 t = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(t.rgb, t.a*vA); }`,
    })
  );
  pts.frustumCulled = false;
  pts.renderOrder = 9;
  camera.add(pts);
  ctx.wisp = {
    mesh: pts, i: 0, acc: 0, ex: 0, ey: 0, lx: 0, ly: 0, idle: 0, seen: false,
    list: Array.from({ length: N }, () => ({ life: 0, max: 1, vx: 0, vy: 0, sz: 0, ph: 0 })),
  };
}
const WD = 3.4;
export function updateWisps(ctx, dt, t) {
  const W = ctx.wisp;
  if (!W) return;
  const cam = ctx.camera;
  const hh = Math.tan((cam.fov * Math.PI) / 360) * WD;
  const px = ctx.rig.tmx * hh * cam.aspect;
  const py = ctx.rig.tmy * hh;
  if (!W.seen) { W.ex = W.lx = px; W.ey = W.ly = py; W.seen = true; }
  W.ex = damp(W.ex, px, 16, dt);
  W.ey = damp(W.ey, py, 16, dt);
  const g = W.mesh.geometry;
  const P = g.attributes.position.array;
  const A = g.attributes.aA.array;
  const Sz = g.attributes.aS.array;
  const L = W.list;
  const N = L.length;
  const dx = W.ex - W.lx;
  const dy = W.ey - W.ly;
  const moved = Math.hypot(dx, dy);
  const ang = moved > 1e-5 ? Math.atan2(dy, dx) : 0;
  const spawn = (x, y, a, weak) => {
    const i = W.i;
    W.i = (i + 1) % N;
    const w = L[i];
    const k = i * 3;
    P[k] = x + (Math.random() + Math.random() - 1) * 0.3;
    P[k + 1] = y + (Math.random() + Math.random() - 1) * 0.3;
    P[k + 2] = -WD + (Math.random() - 0.5) * 0.9;
    w.life = 0;
    w.max = (weak ? 2.1 : 1.45) + Math.random() * 1.3;
    w.vx = -Math.cos(a) * 0.09 + (Math.random() - 0.5) * 0.38;
    w.vy = -Math.sin(a) * 0.09 + (Math.random() - 0.5) * 0.32 + 0.02;
    w.sz = (weak ? 0.018 : 0.024) + Math.random() * 0.026;
    w.ph = Math.random() * TAU;
  };
  W.acc += moved;
  let guard = 0;
  while (W.acc >= 0.03 && guard++ < 14) {
    W.acc -= 0.03;
    const tt = moved > 1e-6 ? Math.min(1, (guard * 0.03) / moved) : 0;
    spawn(W.lx + dx * tt, W.ly + dy * tt, ang, false);
  }
  W.idle += dt;
  if (W.idle > 0.42) { W.idle = 0; spawn(W.ex, W.ey, Math.random() * TAU, true); }
  W.lx = W.ex;
  W.ly = W.ey;
  for (let i = 0; i < N; i++) {
    const w = L[i];
    const k = i * 3;
    if (w.life >= w.max) { A[i] = 0; continue; }
    w.life += dt;
    const u = w.life / w.max;
    P[k] += (w.vx + Math.sin(t * 1.3 + w.ph) * 0.17) * dt;
    P[k + 1] += (w.vy + Math.cos(t * 1.1 + w.ph * 1.7) * 0.14) * dt;
    w.vx *= 1 - 0.5 * dt;
    w.vy = w.vy * (1 - 0.5 * dt) + 0.022 * dt;
    A[i] = smooth(0, 0.12, u) * (1 - smooth(0.22, 1, u)) * 0.9;
    Sz[i] = w.sz * (1 + u * 0.55);
  }
  g.attributes.position.needsUpdate = true;
  g.attributes.aA.needsUpdate = true;
  g.attributes.aS.needsUpdate = true;
}
