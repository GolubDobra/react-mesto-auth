import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      status: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        id="name"
        name="name"
        className="popup__input popup__input-name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        onChange={handleChangeName}
        value={name ? name : ''}
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
        onChange={handleChangeDescription}
        value={description ? description : ''}
        required
      />
      <span id="status-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
