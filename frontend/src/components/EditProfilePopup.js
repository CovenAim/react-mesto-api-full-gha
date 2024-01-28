import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isEditProfilePopupOpen,
  closeAllPopups,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <label className="popup__label">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Введите имя"
          className="edit-form__text edit-form__text_input_name popup__input"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="name-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Введите профессию"
          value={description}
          onChange={handleDescriptionChange}
          className="edit-form__text edit-form__text_input_description popup__input"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="description-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
