import React from 'react';

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_type_photo ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn popup__close-btn_img" onClick={onClose} />
        <img alt={card.name} src={card.link} className="popup__image" />
        <p className="popup__img-title">{card.name}</p>
      </div>
    </div>
  );
};
export default ImagePopup;
