import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
    </header>
  );
};

export default Header;
