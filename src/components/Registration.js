import React from 'react';
import { Link } from 'react-router-dom';

const Registration = ({ onRegister }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          id="reg-email"
          name="email"
          type="email"
          placeholder="Email"
          minLength="2"
          onChange={handleChangeEmail}
          value={email}
          required
        />
        <input
          className="auth__input"
          id="reg-password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="6"
          onChange={handleChangePassword}
          value={password}
          required
        />
        <button className="auth__button-submit" type="submit">
          Зарегистрироваться
        </button>
        <Link className="auth__question" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Registration;
