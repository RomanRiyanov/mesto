export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector, userIdDefault}) {
        this._userNameSelector = userNameSelector;
        this._userDescriptionSelector = userDescriptionSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userDescription = document.querySelector(this._userDescriptionSelector);
        this._profileAvatar = document.querySelector('.profile__image');
        this._userId = userIdDefault;
    }
    
    getUserInfo() {
        const user = {
            user: this._userName.textContent,
            profession: this._userDescription.textContent,
            id: this._userId
        }
        return user;
    }
    
    setUserInfo(user, profession, avatar, id) {
      this._userName.textContent = user;
      this._userDescription.textContent = profession;
      this._profileAvatar.src = avatar;
      this._userId = id;
    }
}
