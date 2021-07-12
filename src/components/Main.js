import React from 'react';
import Pen from '../images/pen.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import api from '../utils/api';

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
            <img
              className="profile__avatar-edit"
              onClick={onEditAvatar}
              src={Pen}
              alt="кнопка редактирования"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__info-edit-button profile__click"
              onClick={onEditProfile}
            />
            <h2 className="profile__info-status">{currentUser.about}</h2>
          </div>
        </div>
        <button type="button" className="profile__add-button profile__click" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
