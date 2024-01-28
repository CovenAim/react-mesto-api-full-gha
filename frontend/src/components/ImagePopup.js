import React from "react";
import usePopupClose from "../hooks/usePopupClose";

export default function ImagePopup({ card, onClose }) {
  const link = card?.link;
  const isOpen = Boolean(link);

  usePopupClose(link, onClose);

  return (
    <div className={`popup popup_form_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup-image-container">
        <img
          src={link}
          alt={card?.name}
          className="popup-image-container__image-fullscreen"
        />
        <h2 className="popup-image-container__title-fullscreen">
          {card?.name}
        </h2>
        <button
          type="button"
          className="popup-image-container__close-button popup-close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
