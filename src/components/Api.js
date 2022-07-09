export class Api {
    constructor (config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else return Promise.reject(`Ошибка: ${res.status}`)
    }
    

    getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponse)
        }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify ({
                    name: data.user,
                    about: data.profession
                  })
            })
            .then(this._checkResponse)
        }

    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify ({avatar})
            })
            .then(this._checkResponse)
        }
    
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._checkResponse)
        }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify ({
                    name: data.place,
                    link: data.imageUrl
                    })
            })
            .then(this._checkResponse)
        }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
        }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._checkResponse)
        }

    unLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
        }
}