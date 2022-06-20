import { Popup } from "./Popup.js";
import {submitFormHandler} from './utils/utils.js';
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

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._submitFormHandler = submitFormHandler;
    }

    _getInputValues() {
        const popupAddPhotoFormValue = {
            name: placeInput.value,
            link: urlInput.value
        };

        return popupAddPhotoFormValue;
    }

    

    setEventListeners() {
        
        buttonAddPhoto.addEventListener('click', () => {
            super.open();
            popupAddPhotoForm.reset();
          
            super.setEventSisteners();
          });

          this._popup.addEventListener('submit', () => {
            event.preventDefault();
            this._submitFormHandler( this._getInputValues() );
            this._popup.querySelector('.submit-button').classList.add('inactive-button');
          });
    }

    close() {
        super.close();

        popupAddPhotoForm.reset();
    }
}


/*
class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
      super(popupSelector);
      this._handleSubmit = handleSubmit;
      this._form = this._popupSelector.querySelector('.popup__container');
      this._inputs = this._form.querySelectorAll('.popup__item')
    }
  
    _getInputValues() { 
      this._values = {};
      this._inputs.forEach((input) => {
      this._values[input.name] = input.value
    })
      return this._values;
    }
  
    setEventListeners() {
      this._form.addEventListener('submit', () => {
        this._handleSubmit()
      })
      super.setEventListeners();
    }
  
    close() {
      super.close();
      this._form.reset();
    }
  }
*/

/*
//обработчики добавления новой фотографии
  
export const placeInput = document.querySelector('.popup__input[name=place]');
export const urlInput = document.querySelector('.popup__input[name=image-url]');

buttonAddPhoto.addEventListener('click', () => {
    popupAddPhotoElement.open();
  
    popupAddPhotoForm.reset();
  
    viewedAddPhotoWindow.toggleButtonState();
  });
  
  popupAddPhotoForm.addEventListener('submit', () => {
    const popupAddPhotoFormValue = {
      name: placeInput.value,
      link: urlInput.value
    }
  
    const aloneCardData = {
      items: popupAddPhotoFormValue, 
      renderer: createCard
    }
  
    const aloneCardRender = new Section (aloneCardData, '.elements');
    aloneCardRender.addItem();
  });

  







buttonEditProfile.addEventListener('click', () => {
    popupEditProfileElement.open();
  
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
  });
  
  popupFormEditProfile.addEventListener('submit', editProfile);
  
  //функция редактирования профиля

export function editProfile(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    //closePopup(popupEditProfile);
    popupEditProfileElement.close();
}
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const nameInput = popupFormEditProfile.querySelector('.popup__input[name=user]');
const jobInput = popupFormEditProfile.querySelector('.popup__input[name=profession]');
*/