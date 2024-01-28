import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({
  isDeletePopupOpen,
  onClose, // Прямая передача функции закрытия
  onConfirmDelete,
  isDeleting,
}) {
  function handleConfirmClick(evt) {
    evt.preventDefault()
      onConfirmDelete()
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isDeletePopupOpen}
      onClose={onClose} // Используем переданную функцию закрытия
      buttonText={"Да"}
      onSubmit={handleConfirmClick}
    >
    </PopupWithForm>
  );
}
