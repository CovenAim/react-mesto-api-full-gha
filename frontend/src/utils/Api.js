class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Error");
    });
  }

  _updateHeaders() {
    const token = localStorage.getItem("token");
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`
    };
  }
  

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._updateHeaders(),
      Credential: 'include'
    });
  }

  getApiUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._updateHeaders(),
    });
  }

  editApiProfile(name, about) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._updateHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editAvatar(avatarUrl) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._updateHeaders(),
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  addNewCardApi(name, link) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._updateHeaders(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  changeLikeStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    const url = `${this._url}/cards/${cardId}/likes`;

    return fetch(url, {
      method: method,
      credentials: "include",
      headers: this._updateHeaders(),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    });
  }

  deleteCardApi(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._updateHeaders(),
    });
  }
}

const api = new Api({
  url: "https://api.mestofan.nomoredomainsmonster.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
