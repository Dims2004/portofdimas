// Ikon Bootstrap Icons untuk sosial media, tools, dan bidang keahlian.
// Nama ikon lengkap: https://icons.getbootstrap.com/
export const socialIcon = (label = "") => {
  const k = label.toLowerCase();
  if (k.includes("linkedin")) return "bi-linkedin";
  if (k.includes("instagram")) return "bi-instagram";
  if (k.includes("github")) return "bi-github";
  if (k.includes("twitter") || k === "x") return "bi-twitter-x";
  if (k.includes("youtube")) return "bi-youtube";
  return "bi-link-45deg";
};

export const toolIcon = (name = "") => {
  const k = name.toLowerCase();
  if (k.includes("python")) return "bi-filetype-py";
  if (k.includes("javascript")) return "bi-filetype-js";
  if (k.includes("esp32") || k.includes("arduino")) return "bi-cpu";
  if (k.includes("html") || k.includes("css")) return "bi-filetype-html";
  if (k.includes("react")) return "bi-braces";
  return "bi-wrench-adjustable";
};

// Urutan sama dengan t.about.services di translations.js
export const serviceIcons = ["bi-cpu", "bi-robot", "bi-bar-chart-line", "bi-code-slash"];

// Tampilkan URL singkat tanpa query (contoh: github.com/Dims2004)
export const shortUrl = (href = "") => {
  try {
    const u = new URL(href);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/$/, "")}`;
  } catch {
    return href;
  }
};
