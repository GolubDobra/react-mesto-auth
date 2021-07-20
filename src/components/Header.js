import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = ({ loggedIn, userEmail, onSignOut }) => {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__auth">
        {loggedIn ? (
          <>
            <p className="header__email header__auth-style">{userEmail}</p>
            <Link className="header__signout header__auth-style" onClick={onSignOut} to="/sign-in">
              Выйти
            </Link>
          </>
        ) : (
          <Link
            className="header__signin header__auth-style"
            to={`${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`}>
            {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
