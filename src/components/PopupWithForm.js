const PopupWithForm = ({ name, title, isOpen, onClose, children, buttonText }) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form name={name} className={`popup__form`}>
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__save-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default PopupWithForm;
