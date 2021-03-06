import React from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Войти</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          id="email"
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
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="6"
          onChange={handleChangePassword}
          value={password}
          required
        />
        <button className="auth__button-submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
