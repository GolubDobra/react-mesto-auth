import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupEditAvatar from './PopupEditAvatar';
import PopupEditUser from './PopupEditUser';
import PopupWithConfirm from './PopupWithConfirm';
import PopupAddCard from './PopupAddCard';

import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header />
      <Main
        onCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />
      <PopupEditAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <PopupEditUser isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupAddCard isOpen={isAddCardPopupOpen} onClose={closeAllPopups} />
      <PopupWithConfirm />

      <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
