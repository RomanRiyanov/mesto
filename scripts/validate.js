export class FormValidator {   
    
    constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = document.querySelector(`#${formElement}`);
      this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    enableValidation = () => {
        this._formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });

        this._setEventListeners();
    };
    

   _setEventListeners () {

    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };


   _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

   _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  };

   _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationConfig.errorClass);
  };

   _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    };
  }

   _hasInvalidInput = () => {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

}
/*
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'inactive-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const wrumwrum = new FormValidator (validationConfig, 'popup__form_edit-profile');
const hrumhrum = new FormValidator (validationConfig, 'popup__form_add-photo');

wrumwrum.enableValidation();
hrumhrum.enableValidation();

*/