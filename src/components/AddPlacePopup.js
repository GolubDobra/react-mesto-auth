import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddCard, isLoading }) => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: title,
      link: link,
    });
    setLink('');
    setTitle('');
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        id="place"
        name="name"
        className="popup__input popup__input_name-place"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={title}
        onChange={handleChangeTitle}
        required
      />
      <span className="popup__input-error" id="place-error"></span>
      <input
        id="link"
        name="link"
        className="popup__input popup__input_link-place"
        type="url"
        value={link}
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        required
      />
      <span className="popup__input-error error2" id="link-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
