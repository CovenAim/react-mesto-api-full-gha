import { useEffect } from "react";

export default function usePopupClose(link, closePopup) {
  useEffect(() => {
    if (!link) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [link, closePopup]);
}
