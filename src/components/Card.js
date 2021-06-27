import React from 'react';

const Card = ({ card, onCardClick }) => {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div className="element">
      <img className="element__image" onClick={handleClick} src={card.link} alt={card.name} />
      <button type="button" className="card__del-button"></button>
      <div className="element__box">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-box">
          <button type="button" className="element__like"></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
