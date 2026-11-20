import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import "./print.css";
import App from "./App.jsx";
import { LanguageProvider } from "./lib/LanguageContext.jsx";
import { withBase } from "./lib/assetPath";

// Latar bertema informatika (public/assets/img/bg-informatika.svg)
// URL dibuat absolut supaya tidak salah resolve relatif terhadap file CSS
const bgUrl = new URL(withBase("assets/img/bg-informatika.svg"), document.baseURI).href;
document.documentElement.style.setProperty("--bg-image", `url("${bgUrl}")`);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LanguageProvider>
  </StrictMode>
);
