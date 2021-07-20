export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => fixResult(res));
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => fixResult(res));
}

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  }).then((res) => fixResult(res));
}

const fixResult = (res) => {
  return res.ok ? res.json() : Promise.reject(`Произошла ошибка: ${res.status}`);
}