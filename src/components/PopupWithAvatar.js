import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithAvatar extends PopupWithForm {
    constructor({popupSelector, submitFormHandler}) {
        super({popupSelector, submitFormHandler});
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() { 
        return this._form.querySelector('input').value;
      }
}