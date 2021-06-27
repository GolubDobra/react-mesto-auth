import React from 'react';
import PopupWithForm from './PopupWithForm';

const PopupEditAvatar = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}>
      <input
        id="avatar"
        name="link"
        className="popup__input popup__input_link-place"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
};

export default PopupEditAvatar;
