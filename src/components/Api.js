import { API } from "../utils/constants";

export default class Api {
  constructor() {
    this._getResponse = this._getResponse.bind(this)
    this._getHeaders = this._getHeaders.bind(this)
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    return {
    authorization: '3797bd0f-31da-43b0-b12c-2d59c89b7ac4',
    'Content-Type': 'application/json'
    }
  }

  getProfile() {
    return fetch(`${API}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  getCard() {
    return fetch(`${API}/cards`, {
      credentials: 'omit',
      method: 'GET',
      headers: this._getHeaders()
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  editProfile(data) {
    return fetch(`${API}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  addCard(data) {
    return fetch(`${API}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  likeCard(id) {
    return fetch(`${API}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  dislikeCard(id) {
    return fetch(`${API}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  deleteCard(id) {
    return fetch(`${API}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }

  changeAvatar(data) {
    return fetch(`${API}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data
      })
    })
    .then((res) => this._getResponse(res))
    .catch(err => console.log(err))
  }
}
