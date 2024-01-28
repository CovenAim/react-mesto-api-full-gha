import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function InfoTooltip({ isInfoTooltipOpen, closeAllPopups, type, notification }) {
    return(
        <PopupWithForm name="infotooltip-success" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} showButton={false}>
        <button type="button" className="popup-container__close-button popup-close" onClick={closeAllPopups}></button>
        <div className={`popup__infotooltip_image-type_${notification.type}`} ></div>
        <h2 className="popup-container__title-infotooltip">{notification.text}</h2>
        </PopupWithForm>
   );
}