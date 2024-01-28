import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isEditAvatarPopupOpen,
  closeAllPopups,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = useRef();

  useEffect(() => {
    if (!isEditAvatarPopupOpen) {
      // Очищаем значение при закрытии попапа
      avatarRef.current.value = "";
    }
  }, [isEditAvatarPopupOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          name="url"
          id="url-avatar"
          placeholder="Ссылка на аватар"
          className="avatar-edit-form__input-url popup__input"
          ref={avatarRef}
          required
        />
        <span className="url-avatar-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
