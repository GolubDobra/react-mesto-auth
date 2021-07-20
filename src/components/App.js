import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import PopupWithConfirm from './PopupWithConfirm';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Registration from './Registration';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';

import '../index.css';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddCardPopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsInfoTooltipOpen(false);

    setSelectedCard(null);

    setIsConfirmPopupOpen(false);
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  const handleCardDelete = (card) => {
    setIsConfirmPopupOpen(true);
    setDeleteCard(card);
  }

  const handleCardDeleteConfirm = (card) =>{
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item !== card);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .newPhotoAvatar(data.url) //
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .updateProfile(data.name, data.status)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api
      .saveNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // регистрация аутентификация и авторизация
  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccess(false);
      })
      .catch((err) => {
        console.log(`Не удалось зарегистрироваться. Ошибка: ${err}.`);
      });
  }

  const handleLogin = (email, password) => {
    return auth
      .authorization(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(`Не удалось войти. Ошибка: ${err}.`);
      });
  }

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Не удалось передать токен. Ошибка: ${err}.`);
        });
    } else {
      console.log('Нет токена');
      return;
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/sihn-in');
  }

  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={handleSignOut} />
      <ProtectedRoute
        path="/"
        component={Main}
        loggedIn={loggedIn}
        onCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Route path="/sign-up">
        <Registration onRegister={handleRegister} />
      </Route>
      <Route path="/sign-in">
        <Login onLogin={handleLogin} />
      </Route>
      <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in" />}</Route>
      <Footer />
      {loggedIn ? (
        <>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            handleDeleteCardConfirm={handleCardDeleteConfirm}
            delCard={deleteCard}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
        </>
      ) : null}
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegistration={isRegistrationSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
