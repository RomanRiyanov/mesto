import {Popup} from './Popup.js';
   
export class PopupWithImage extends Popup {
        constructor(popupSelector) {
            super(popupSelector);
            this._imageViewWindow = this._popup.querySelector('.popup__view-image');
            this._figcaption = document.querySelector('.popup__figcaption');
        }
    open(data) {        
        this._imageViewWindow.src = data.link;
        this._imageViewWindow.alt = data.name;
        this._figcaption.textContent = data.name;

        super.open();
    }
}