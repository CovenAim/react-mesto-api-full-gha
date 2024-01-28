import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isAddPlacePopupOpen,
  closeAllPopups,
  onAddPlace,
  isLoading
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    if (!isAddPlacePopupOpen) {
      setName("");
      setLink("");
      setNameError("");
      setLinkError("");
    }
  }, [isAddPlacePopupOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Валидация
    if (name.length < 2 || name.length > 40) {
      setNameError("Название должно содержать от 2 до 40 символов");
      return;
    } else {
      setNameError("");
    }

    onAddPlace({
      name,
      link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError("");
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkError("");
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Добавляем..." : "Добавить"}
    >
      <label className="popup__label" htmlFor="name-place">
        <input
          type="text"
          id="name-place"
          name="name-place"
          value={name}
          onChange={handleNameChange}
          placeholder="Название"
          className="add-form__text add-form__text_input_title popup__input"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="name-place-error popup__input-error">{nameError}</span>
      </label>
      <label className="popup__label" htmlFor="url">
        <input
          type="url"
          name="url"
          id="url"
          value={link}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          className="add-form__text add-form__text_input_url popup__input"
          required
        />
        <span className="url-error popup__input-error">{linkError}</span>
      </label>
    </PopupWithForm>
  );
}
