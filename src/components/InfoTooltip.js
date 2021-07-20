import failRegistration from '../images/failRegistration.png';
import successRegistration from '../images/successRegistration.png';

const InfoTooltip = ({ isOpen, onClose, isRegistration }) => {
  return (
    <div className={`popup popup_type_auth ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_auth">
        <img
          className="popup__auth-img"
          src={isRegistration ? successRegistration : failRegistration}
          alt="Результат регистрации"
        />
        <h3 className="popup__title popup__title_auth">
          {isRegistration
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так :( Попробуйте ещё раз.'}
        </h3>
        <button className="popup__close-btn" onClick={onClose} type="button" aria-label="Закрыть" />
      </div>
    </div>
  );
};

export default InfoTooltip;
