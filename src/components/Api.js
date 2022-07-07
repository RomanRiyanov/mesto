export class Api {
    constructor (config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers
    }

    _fetch(url, method, body) {
        return fetch(url, {
            method,
            headers: this._headers,
            body: body ? JSON.stringify(body) : undefined
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else return Promise.reject(`Ошибка: ${res.status}`)})
    }

    getUserInfo() {
        return this._fetch(`${this._baseUrl}/users/me`, 'GET')
    }

    setUserInfo(data) {
        return this._fetch(`${this._baseUrl}/users/me`, 'PATCH', { name: data.user, about: data.profession })
    }

    // getUserInfo() {
    // return fetch(`${this._baseUrl}/users/me`, {
    //         method: 'GET',
    //         headers: this._headers
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else return Promise.reject(`Ошибка: ${res.status}`)})
    // }


    // setUserInfo(data) {
    //     return fetch(`${this._baseUrl}/users/me`, {
    //             method: 'PATCH',
    //             headers: this._headers,
    //             body: JSON.stringify ({
    //                 name: data.user,
    //                 about: data.profession
    //               })
    //         })
    //             .then(res => {
    //                 if (res.ok) {
    //                     return res.json()
    //                 } else return Promise.reject(`Ошибка: ${res.status}`)})
    //     }

    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify ({avatar})
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else return Promise.reject(`Ошибка: ${res.status}`)})
        }
    
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'GET',
                headers: this._headers
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                } else return Promise.reject(`Ошибка: ${res.status}`)})
            //     .then((result) => {
            //     console.log(result);
            //     console.log('сразу все карточки');
            // });
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
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                    } else return Promise.reject(`Ошибка: ${res.status}`)})
            }

        deleteCard(id) {
            return fetch(`${this._baseUrl}/cards/${id}`, {
                    method: 'DELETE',
                    headers: this._headers,
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                    } else return Promise.reject(`Ошибка: ${res.status}`)})
            }

        likeCard(id) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                    method: 'PUT',
                    headers: this._headers,
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                    } else return Promise.reject(`Ошибка: ${res.status}`)})
            }

        unLikeCard(id) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                    method: 'DELETE',
                    headers: this._headers,
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json()
                    } else return Promise.reject(`Ошибка: ${res.status}`)})
            }
}