import { Popup } from "./Popup";

export class PopupDeletePhoto extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmButton = this._popup.querySelector('.confirm-button');
    }

    open(handlePopapSubmit) {
        super.open();
        this._handlePopapSubmit = handlePopapSubmit;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handlePopapSubmit();
        })
    }
}
