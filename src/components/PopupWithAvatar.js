import { PopupWithForm } from "./PopupWithForm.js";

export class PopupWithAvatar extends PopupWithForm {
    constructor({popupSelector, submitFormHandler}) {
        super({popupSelector, submitFormHandler});
        this._input = this._form.querySelector('input');
    }

    _getInputValues() { 
        return this._input.value;
      }
}