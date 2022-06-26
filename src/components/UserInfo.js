export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._userNameSelector = userNameSelector;
        this._userDescriptionSelector = userDescriptionSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userDescription = document.querySelector(this._userDescriptionSelector);
    }

    getUserInfo() {
        const user = {
            user: this._userName.textContent,
            profession: this._userDescription.textContent
        }
        return user;
    }

    setUserInfo({user, profession}){
      this._userName.textContent = user;
      this._userDescription.textContent = profession;
    }
}