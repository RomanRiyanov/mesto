import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({popupSelector, submitFormHandler}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitFormHandler = submitFormHandler;
        this._submitButton = this._popup.querySelector('.submit-button');
    }

    _getInputValues() { 
      this._values = {};
      this._form.querySelectorAll('input').forEach((input) => {
      this._values[input.name] = input.value
    })
      return this._values;
    }

    _setStartValue(startValue) {
      Object.keys(startValue).forEach((key) => {
        const targetInput = this._form.querySelector(`input[name="${key}"]`);
        if (targetInput) targetInput.value = startValue[key];
      });
    }

    open(startValue) {
      this._setStartValue(startValue);
      super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    setLoading(value) {
        if (value) {
          this._submitButton.textContent = this._submitButton.textContent + '...';
        } else {
          this._submitButton.textContent = this._submitButton.textContent.slice(0, -3);
        }
    }

    setEventListeners() {
      super.setEventListeners.call(this);

      this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        this._submitFormHandler( this._getInputValues() );
      });
    }
}