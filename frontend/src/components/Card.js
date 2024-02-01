import React from "react";
import trash from "../images/Trash.svg";
import like from "../images/Trash.svg";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  onDeletePopupClick,
}) {
  
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeletePopupClick(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__group-favorite ${
    isLiked ? "element__group-favorite_active" : ""
  }`;

  return (
    <article className="element">
      {isOwn && (
        <button
          type="button"
          className="element__delete-button"
          onClick={handleDeleteClick}
        >
          <img
            className="element__image-delete"
            src={trash}
            alt="Кнопка удаления"
          />
        </button>
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__group-title">{card.name}</h2>
        <button
          type="button"
          className="element__group-button"
          onClick={handleLikeClick}
        >
          <img className={cardLikeButtonClassName} alt="Избранное" src={like} />
        </button>
      </div>
      <span id="element__likes" className="element__likes">
        {card.likes.length}
      </span>
    </article>
  );
}
