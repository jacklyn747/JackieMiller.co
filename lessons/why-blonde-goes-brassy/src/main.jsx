import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Tell a parent page (Webflow) how tall the lesson is, so the iframe can
// grow to fit. Harmless when the page is opened on its own.
if (window.parent !== window && "ResizeObserver" in window) {
  const post = () =>
    window.parent.postMessage(
      { type: "brassy-lesson:height", height: document.documentElement.scrollHeight },
      "*"
    );
  new ResizeObserver(post).observe(document.body);
}
