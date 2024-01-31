const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  disabledButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const editButtonElement = document.querySelector(".profile__info-edit-button"); //Находим кнопку редактирования профиля
const popupEditForm = document.querySelector(".popup_form_edit"); //Находим саму Попап форму редактирования
const editForm = popupEditForm.querySelector(".edit-form"); //Поиск формы редактирования
const addButtonElement = document.querySelector(".profile__add-button"); //Находим кнопку добавления нового места
const popupAddForm = document.querySelector(".popup_form_add"); //Контейнер добавления нового места
const addForm = popupAddForm.querySelector(".add-form"); //Находим саму форму добавления нового места
const cardsContainer = document.querySelector(".elements"); //Находим поле для создания карточек
const closeButtons = document.querySelectorAll(".popup-close"); //Поиск всех кнопок закрытия попапов
const nameElement = document.getElementById("name-place"); //Переменная с ID имени формы добавления карточки
const urlElement = document.getElementById("url"); //Переменная с ID url формы добавления карточки
const inputName = document.querySelector('input[name="name"]'); //Поиск элемента input, у которого атрибут равен name
const inputDescription = document.querySelector('input[name="description"]'); //Поиск элемента input, у которого атрибут равен description
const optionsApi = {
  url: "https://api.mestofan.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
  },
};

export {
  validationConfig,
  editButtonElement,
  popupEditForm,
  editForm,
  addButtonElement,
  popupAddForm,
  addForm,
  cardsContainer,
  closeButtons,
  nameElement,
  urlElement,
  inputName,
  inputDescription,
  optionsApi,
};
