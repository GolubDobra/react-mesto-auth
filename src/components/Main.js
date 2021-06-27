import React, { useEffect, useState } from 'react';
import Pen from '../images/pen.svg';
import Card from './Card';
import api from '../utils/api';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
  const [userName, setuserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([userData, cards]) => {
        setuserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={userAvatar} alt="Аватар" />
            <img
              className="profile__avatar-edit"
              onClick={onEditAvatar}
              src={Pen}
              alt="кнопка редактирования"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-name">{userName}</h1>
            <button
              type="button"
              className="profile__info-edit-button profile__click"
              onClick={onEditProfile}
            />
            <h2 className="profile__info-status">{userDescription}</h2>
          </div>
        </div>
        <button type="button" className="profile__add-button profile__click" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
};

export default Main;
