import React from 'react';
import PopupWithForm from './PopupWithForm';

const PopupEditUser = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        id="name"
        name="name"
        className="popup__input popup__input-name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
      />
      <span id="name-error" className="popup__input-error"></span>
      <input
        id="status"
        name="status"
        className="popup__input popup__input-status"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="Описание"
        required
      />
      <span id="status-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};

export default PopupEditUser;
