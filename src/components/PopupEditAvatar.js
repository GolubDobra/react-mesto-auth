import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const PopupEditAvatar = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const curRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      url: curRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        ref={curRef}
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
