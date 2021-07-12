import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__del-button ${
    isOwn ? 'card__del-button' : 'card__del-button_hidden'
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  const handleClick = () => {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img className="element__image" onClick={handleClick} src={card.link} alt={card.name} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      <div className="element__box">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-box">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
