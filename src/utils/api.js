class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  updateProfile(name, status) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: status,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  saveNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  newPhotoAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.likeCard(id);
    }
    return this.delCardLike(id);
  }

  delCardLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error: ${res.status}`);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '0a7c4926-ca88-44b6-9ff4-20890c743148',
    'Content-Type': 'application/json',
  },
});

export default api;
