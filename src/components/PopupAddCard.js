import React from 'react';
import PopupWithForm from './PopupWithForm';

const PopupAddCard = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Добавить"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        id="place"
        name="name"
        className="popup__input popup__input_name-place"
        type="text"
        required
        minLength="2"
        maxLength="30"
        placeholder="Название"
      />
      <span className="popup__input-error" id="place-error"></span>
      <input
        id="link"
        name="link"
        className="popup__input popup__input_link-place"
        type="url"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error error2" id="link-error"></span>
    </PopupWithForm>
  );
};

export default PopupAddCard;
