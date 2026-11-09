import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { clamp, lerp, smooth, damp, sat } from "./textures";
import {
  buildSky, buildMountains, buildGround, buildCandi, buildStair, buildBentar,
  buildGunungan, buildBamboo, buildLights, buildAtmosphere, buildWisps,
  updatePetals, updateWisps,
} from "./build";

// ============================================================
// Dunia 3D: kompleks candi saat malam, bulan merah, bambu, gunungan.
// Kamera berjalan di sepanjang jalur sesuai posisi scroll; setiap
// <section data-cam="n"> di halaman adalah satu "bab" / landing page.
// ============================================================

/** Satu waypoint per bab: 0 beranda … 6 kontak */
export const CAM = [
  { p: [0, 4.2, 16], t: [0, 9, -40], fov: 38 },
  { p: [-7, 3.2, 5], t: [2, 8, -34], fov: 46 },
  { p: [0, 3.4, -1.5], t: [0, 10, -38], fov: 44 },
  { p: [-5, 4.4, -14], t: [-19, 5, -30], fov: 46 },
  { p: [0, 15.5, -23], t: [0, 15, -50], fov: 44 },
  { p: [11, 19, -29], t: [0, 17, -44], fov: 46 },
  { p: [0, 21, -26], t: [7, 31, -110], fov: 42 },
];

const POST_GRADE = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uFade: { value: 1 }, uRes: { value: new THREE.Vector2(1, 1) } },
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform float uFade; uniform vec2 uRes; varying vec2 vUv;
    void main(){
      vec2 d = vUv - 0.5; float r2 = dot(d,d);
      float ca = (0.3 + r2*2.6) * 0.0012;
      vec3 c;
      c.r = texture2D(tDiffuse, vUv + d*ca).r;
      c.g = texture2D(tDiffuse, vUv).g;
      c.b = texture2D(tDiffuse, vUv - d*ca).b;
      float l = dot(c, vec3(0.2126,0.7152,0.0722));
      c = mix(c, c*vec3(0.74,1.03,1.11), smoothstep(0.55,0.0,l)*0.8);
      c = mix(c, c*vec3(1.05,0.99,0.94), smoothstep(0.4,1.0,l)*0.25);
      float v = smoothstep(1.25, 0.28, length(d*vec2(1.0,0.95))*1.4);
      c *= mix(1.0, v, 0.95);
      float g = fract(sin(dot(vUv*uRes + uTime*137.0, vec2(12.9898,78.233)))*43758.5453);
      c += (g-0.5)*0.02;
      gl_FragColor = vec4(c*uFade, 1.0);
    }`,
};

export async function createWorld(canvas, { onProgress = () => {}, onLost = () => {}, quality } = {}) {
  const coarse = matchMedia("(hover: none)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const Q = quality || "low"; /* ringan untuk semua perangkat; ?q=high untuk kualitas penuh */
  const vw = () => document.documentElement.clientWidth || innerWidth;
  const vh = () => document.documentElement.clientHeight || innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  const DPR_CAP = Q === "low" ? 1.25 : 1.8;
  const perf = { scale: 1, acc: 0, n: 0 };
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, DPR_CAP));
  renderer.setSize(vw(), vh(), false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x05060d, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070b10, 0.0105);
  const camera = new THREE.PerspectiveCamera(38, vw() / vh(), 0.3, 600);
  scene.add(camera);

  const ctx = {
    scene, camera, renderer, quality: Q, coarse,
    uTime: { value: 0 },
    uPx: { value: vh() * renderer.getPixelRatio() },
    rig: { prog: 0, smooth: 0, mx: 0, my: 0, tmx: 0, tmy: 0, intro: 0, focus: -1, focusAmt: 0 },
  };

  /* ---- pemuatan bertahap supaya preloader bisa menampilkan progres ---- */
  const jobs = [
    () => buildLights(ctx),
    () => buildSky(ctx),
    () => buildMountains(ctx),
    () => buildGround(ctx),
    () => buildCandi(ctx),
    () => buildStair(ctx),
    () => buildBentar(ctx),
    () => buildGunungan(ctx),
    () => buildBamboo(ctx),
    () => { buildAtmosphere(ctx); buildWisps(ctx); },
  ];
  for (let i = 0; i < jobs.length; i++) {
    await new Promise((r) => setTimeout(r, 14));
    jobs[i]();
    onProgress((i + 1) / jobs.length);
  }

  /* ---- post-processing: bloom + grading ---- */
  const rt = new THREE.WebGLRenderTarget(vw(), vh(), { type: THREE.HalfFloatType, samples: Q === "low" ? 0 : 4 });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(vw() / 2, vh() / 2), 0.5, 0.6, 0.86);
  composer.addPass(bloom);
  const grade = new ShaderPass(POST_GRADE);
  composer.addPass(grade);
  composer.addPass(new OutputPass());

  /* ---- jalur kamera ---- */
  const curveP = new THREE.CatmullRomCurve3(CAM.map((c) => new THREE.Vector3(...c.p)), false, "catmullrom", 0.4);
  const curveT = new THREE.CatmullRomCurve3(CAM.map((c) => new THREE.Vector3(...c.t)), false, "catmullrom", 0.4);
  const _p = new THREE.Vector3();
  const _t = new THREE.Vector3();
  const _d = new THREE.Vector3();

  /* ---- scroll → bab ---- */
  let anchors = [0];
  let maxScroll = 1;
  let scenes = [];
  let pinned = 0;
  const measure = () => {
    scenes = [...document.querySelectorAll("[data-cam]")].sort((a, b) => +a.dataset.cam - +b.dataset.cam);
    maxScroll = Math.max(1, document.documentElement.scrollHeight - vh());
    anchors = scenes.map((el, i) => {
      if (i === 0) return 0;
      if (i === scenes.length - 1) return maxScroll;
      const top = el.getBoundingClientRect().top + scrollY;
      return clamp(top + el.offsetHeight * 0.5 - vh() * 0.5, 0, maxScroll);
    });
    for (let i = 1; i < anchors.length; i++) anchors[i] = Math.max(anchors[i], anchors[i - 1] + 1);
  };
  const progressFor = (y) => {
    if (anchors.length < 2) return 0;
    if (y <= anchors[0]) return 0;
    for (let i = 0; i < anchors.length - 1; i++)
      if (y <= anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
    return anchors.length - 1;
  };

  const aspectFix = () => clamp((1.62 - vw() / vh()) / 1.05, 0, 1);

  const applyCamera = () => {
    const N = CAM.length - 1;
    const u = clamp(ctx.rig.smooth / N, 0, 1);
    curveP.getPoint(u, _p);
    curveT.getPoint(u, _t);
    const i = clamp(Math.floor(ctx.rig.smooth), 0, N - 1);
    const f = clamp(ctx.rig.smooth - i, 0, 1);
    let fov = lerp(CAM[i].fov, CAM[i + 1].fov, f);
    const nf = aspectFix();
    if (nf > 0) {
      _d.subVectors(_p, _t).normalize();
      _p.addScaledVector(_d, nf * 8);
      _p.y += nf * 1.1;
      fov *= 1 + nf * 0.4;
    }
    const io = 1 - ctx.rig.intro;
    _p.z += io * 6;
    _p.y += io * 0.7;
    fov += io * 8;
    const par = 1 - smooth(0, 1.6, ctx.rig.smooth) * 0.55;
    _p.x += ctx.rig.mx * 0.7 * par;
    _p.y += ctx.rig.my * 0.38 * par;
    _t.x -= ctx.rig.mx * 0.22 * par;
    _t.y -= ctx.rig.my * 0.12 * par;
    camera.position.copy(_p);
    camera.lookAt(_t);
    if (Math.abs(camera.fov - fov) > 1e-4) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  };

  /* ---- ukuran ---- */
  const resize = () => {
    const w = vw();
    const h = vh();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, DPR_CAP) * perf.scale);
    renderer.setSize(w, h, false);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(w, h);
    bloom.resolution.set(w / 2, h / 2);
    grade.uniforms.uRes.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    ctx.uPx.value = h * renderer.getPixelRatio();
    measure();
  };

  const onMove = (e) => {
    ctx.rig.tmx = (e.clientX / vw()) * 2 - 1;
    ctx.rig.tmy = -((e.clientY / vh()) * 2 - 1);
  };
  const onResize = () => resize();
  const onCtxLost = (e) => { e.preventDefault(); running = false; cancelAnimationFrame(raf); onLost(); };
  canvas.addEventListener("webglcontextlost", onCtxLost);
  addEventListener("pointermove", onMove, { passive: true });
  addEventListener("resize", onResize, { passive: true });
  const ro = new ResizeObserver(() => measure());
  ro.observe(document.body);

  /* ---- loop ---- */
  let running = false;
  let raf = 0;
  let prev = 0;
  let clock = 0;
  let t0 = 0;
  let activeIdx = 0;
  const listeners = new Set();
  const emit = () => listeners.forEach((f) => f({ active: activeIdx, progress: ctx.rig.prog }));

  const MIN_DT = Q === "low" ? 1000 / 40 - 2 : 0;
  let lastRender = 0;
  const frame = (now) => {
    if (!running) return;
    if (MIN_DT && now - lastRender < MIN_DT) { raf = requestAnimationFrame(frame); return; }
    lastRender = now;
    const raw = (now - prev) / 1000 || 0;
    const dt = Math.min(raw, 0.05);
    prev = now;
    clock += dt;
    ctx.uTime.value = clock;

    /* penyesuaian resolusi otomatis bila perangkat berat */
    if (clock > 2.5) {
      perf.acc += raw;
      perf.n++;
      if (perf.n >= 40 || perf.acc > 0.9) {
        const avg = perf.acc / perf.n;
        perf.acc = 0;
        perf.n = 0;
        if (avg > 0.024 && perf.scale > 0.55) { perf.scale = Math.max(0.55, perf.scale * (avg > 0.05 ? 0.64 : 0.85)); resize(); }
        else if (avg < 0.0138 && perf.scale < 1) { perf.scale = Math.min(1, perf.scale + 0.08); resize(); }
      }
    }

    /* kamera ditahan di waypoint halaman, lalu bergeser sedikit mengikuti scroll */
    const room = Math.max(1, document.documentElement.scrollHeight - vh());
    const drift = pinned < CAM.length - 1 ? sat(scrollY / room) * 0.32 : 0;
    const target = pinned + drift;
    ctx.rig.prog = target;
    ctx.rig.smooth = reduce ? target : damp(ctx.rig.smooth, target, 5, dt);
    ctx.rig.mx = damp(ctx.rig.mx, ctx.rig.tmx, 2.6, dt);
    ctx.rig.my = damp(ctx.rig.my, ctx.rig.tmy, 2.6, dt);
    const el = (now - t0) / 1000;
    ctx.rig.intro = reduce ? 1 : sat(el / 2.6);
    ctx.rig.focusAmt = damp(ctx.rig.focusAmt, ctx.rig.focus >= 0 ? 1 : 0, 5, dt);

    const a = Math.round(clamp(ctx.rig.smooth, 0, CAM.length - 1));
    if (a !== activeIdx) { activeIdx = a; emit(); }

    applyCamera();

    /* elemen hidup */
    const f = ctx.rig.focusAmt;
    ctx.lamps?.forEach((l, i) => {
      const fl = 0.85 + 0.2 * Math.sin(clock * (2.4 + (i % 3) * 0.7) + l.seed);
      l.sprite.material.opacity = 0.7 * fl + f * 0.2;
      l.flame.scale.y = 1.5 + 0.4 * Math.sin(clock * 5 + l.seed);
    });
    ctx.hot?.forEach((h, i) => { h.l.intensity = h.base * (1 + f * 0.35) * (0.93 + 0.07 * Math.sin(clock * (1.7 + i) + i)); });
    if (ctx.moonHalo) ctx.moonHalo.material.opacity = 0.5 + f * 0.12 + Math.sin(clock * 0.34) * 0.05;
    if (ctx.moon) ctx.moon.lookAt(camera.position);
    if (ctx.moonHalo) ctx.moonHalo.lookAt(camera.position);
    if (ctx.gunungan) ctx.gunungan.position.y = 0.2 + Math.sin(clock * 0.6) * 0.18;
    ctx.haze?.forEach((h) => {
      h.position.x = h.userData.x0 + Math.sin(clock * h.userData.sp + h.userData.ph) * 6;
      h.quaternion.copy(camera.quaternion);
    });
    updatePetals(ctx, dt, clock);
    updateWisps(ctx, dt, clock);

    grade.uniforms.uTime.value = clock;
    grade.uniforms.uFade.value = sat(el / 0.8);
    composer.render();
    raf = requestAnimationFrame(frame);
  };

  const onVis = () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf); }
    else if (!running && started && !paused) { running = true; prev = performance.now(); raf = requestAnimationFrame(frame); }
  };
  document.addEventListener("visibilitychange", onVis);

  let started = false;
  let paused = false;
  resize();

  return {
    start() {
      if (started) return;
      started = true;
      running = true;
      prev = t0 = performance.now();
      raf = requestAnimationFrame(frame);
    },
    /** menahan kamera di satu bab (dipakai halaman selain beranda) */
    /** hentikan render saat lightbox terbuka (hemat GPU, mencegah macet) */
    setPaused(v) {
      paused = !!v;
      if (paused) { running = false; cancelAnimationFrame(raf); }
      else if (started && !running && !document.hidden) { running = true; prev = performance.now(); raf = requestAnimationFrame(frame); }
    },
    setPinned(v) { pinned = clamp(+v || 0, 0, CAM.length - 1); },
    measure,
    setFocus(i) { ctx.rig.focus = i; },
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    get active() { return activeIdx; },
    _debugJump(v) { pinned = v; ctx.rig.smooth = v; ctx.rig.intro = 1; },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onCtxLost);
      ro.disconnect();
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const m = o.material;
        if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { x.map?.dispose?.(); x.emissiveMap?.dispose?.(); x.dispose?.(); });
      });
      composer.dispose?.();
      renderer.dispose();
      renderer.forceContextLoss?.();
    },
  };
}
