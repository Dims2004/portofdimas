import { useSyncExternalStore } from "react";

// ============================================================
// Penyimpan status dunia 3D yang dibaca komponen React:
//  loading (0..1), ready, webgl (false = fallback), active (indeks kamera halaman aktif)
// ============================================================
let state = { loading: 0, ready: false, webgl: true, active: 0 };
const subs = new Set();

export const sceneStore = {
  world: null,
  get: () => state,
  set(patch) {
    state = { ...state, ...patch };
    subs.forEach((f) => f());
  },
  subscribe(f) {
    subs.add(f);
    return () => subs.delete(f);
  },
};

export function useScene(selector = (s) => s) {
  return useSyncExternalStore(sceneStore.subscribe, () => selector(state));
}
