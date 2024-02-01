import React from "react";
import edit from "../images/editButton.svg";
import plus from "../images/plus.svg";
import Card from "./Card";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onDeletePopupClick,
}) {

const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          id="profile-avatar"
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{
            backgroundImage: `url(${currentUser ? currentUser.avatar : ""})`,
          }}
        ></button>
        <div className="profile__info">
          <h1 id="profile-name" className="profile__info-name">
            {currentUser ? currentUser.name : ""}
          </h1>
          <p id="profile-description" className="profile__info-description">
            {currentUser ? currentUser.about : ""}
          </p>
          <button
            type="button"
            className="profile__info-edit-button"
            onClick={onEditProfile}
          >
            <img
              src={edit}
              className="profile__info-edit-button-image"
              alt="Редактирование кнопка"
            />
          </button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img
            src={plus}
            alt="Добавление"
            className="profile__add-button-image"
          />
        </button>
      </section>
      <section className="elements">
        {cards?.map((card, index) => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeletePopupClick={onDeletePopupClick}
            />
          );
        })}
      </section>
    </main>
  );
}
