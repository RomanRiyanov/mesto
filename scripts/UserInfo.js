import {
    initialCards,
    validationConfig,
    popupAddPhotoForm,
    placeInput,
    urlInput,
    popupFormEditProfile,
    buttonEditProfile,
    buttonAddPhoto,
    profileName,
    profileInfo,
    nameInput,
    jobInput,
  } from './utils/constants.js';

export class UserInfo {
    constructor({userNameSelector, userDescriptionSelector}) {
        this._userNameSelector = userNameSelector;
        this._userDescriptionSelector = userDescriptionSelector;
        this._userName = document.querySelector(this._userNameSelector);
        this._userDescription = document.querySelector(this._userDescriptionSelector);
    }

    getUserInfo() {
        const user = {
            //name: profileName.textContent,
            //info: profileInfo.textContent
            user: profileName.textContent,
            profession: profileInfo.textContent
        }
        return user;
    }

    setUserInfo({user, profession}){
        profileName.textContent = user;
        profileInfo.textContent = profession;
    }
}




/*

const userInfo = new UserInfo({
    userNameSelector: "селектор имени",
    userDescriptionSelector: "селектор описания"
  });
  
  const userInfoPopup = new PopupWithForm({
    popupSelector: popupConfig.editFormModalWindow,
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data)
    }
  });



constructor (data, containerSelector) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._cardsContainer = document.querySelector(containerSelector);
}


buttonEditProfile.addEventListener('click', () => {
    popupEditProfileElement.open();
  
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
  });
  
  popupFormEditProfile.addEventListener('submit', editProfile);
  

export function editProfile(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    //closePopup(popupEditProfile);
    popupEditProfileElement.close();
}
  
  export const profileName = document.querySelector('.profile__title');
   export const profileInfo = document.querySelector('.profile__subtitle');

   export const nameInput = popupFormEditProfile.querySelector('.popup__input[name=user]');
   export const jobInput = popupFormEditProfile.querySelector('.popup__input[name=profession]');
  
  */