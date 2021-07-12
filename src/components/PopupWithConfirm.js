import React from 'react';
import PopupWithForm from './PopupWithForm';

const PopupWithConfirm = ({ isOpen, onClose, isLoading, handleDeleteCardConfirm, delCard }) => {
  function handleSubmit(e) {
    e.preventDefault();
    handleDeleteCardConfirm(delCard);
  }
  return (
    <PopupWithForm
      name="submit"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}></PopupWithForm>
  );
};

export default PopupWithConfirm;
