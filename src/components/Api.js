export class Api {
    constructor (config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers
    }

    getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else return Promise.reject(`Ошибка: ${res.status}`)})
           // .then((result) => {
            // console.log(result);
            // console.log('информация о пользователе');
       // });
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
}