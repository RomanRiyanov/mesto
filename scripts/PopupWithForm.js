import { Popup } from "./Popup.js";
//import {submitFormHandler} from './utils/utils.js';
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
    constructor({popupSelector, submitFormHandler}) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitFormHandler = submitFormHandler;
    }

    _getInputValues() {
        // this._popupAddPhotoFormValue = {
        //     name: placeInput.value,
        //     link: urlInput.value
        // };

        // return this._popupAddPhotoFormValue;

        return 
    }

    _getInputValues() { 
      this._values = {};
      this._form.querySelectorAll('input').forEach((input) => {
      this._values[input.name] = input.value
    })
      return this._values;
    }

    _setStartValue(startValue) {
      // nameInput.value = startValue.user;
      // jobInput.value = startValue.profession;
      Object.keys(startValue).forEach(key => {
        this._form.querySelector(`input[name="${key}"]`).value = startValue[key];
      })
    }

    open(startValue) {
      this._setStartValue(startValue);
      super.open();
    }

    setEventListeners() {
          // buttonEditProfile.addEventListener('click', () => {
          //   this._setStartValue()
          //   this.open();
          // })

          super.setEventSisteners.call(this);

          this._form.addEventListener('submit', () => {
            event.preventDefault();
            this._submitFormHandler( this._getInputValues() );
            this.setEventSisteners();
            this.close();
          });
    }

    close() {
        super.close();
        //this._popup.querySelector('.submit-button').classList.add('inactive-button');

        this._form.reset();
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