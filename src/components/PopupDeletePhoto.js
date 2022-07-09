import { PopupWithForm } from "./PopupWithForm";

export class PopupDeletePhoto extends PopupWithForm {
    constructor(popupSelector) {
        super({popupSelector});
        this._confirmButton = this._popup.querySelector('.confirm-button');
    }

    open(handlePopapSubmit) {
        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', this._handleEscClose);
        this._handlePopapSubmit = handlePopapSubmit;
    }

    close() {
        this._popup.classList.remove('popup_viewable');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    
    setEventListeners() {
        this._closeButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.close();
        });
        this._popup.addEventListener('click', (event) => {
            this._closePopupByPressOnOverlay(event);
        });
        this._confirmButton.addEventListener('click', () => {
            this._handlePopapSubmit();
        })
    }
}