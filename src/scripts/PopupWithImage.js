import {Popup} from './Popup.js';
   
export class PopupWithImage extends Popup {
        constructor(popupSelector) {
            super(popupSelector);
            this._imageViewWindow = document.querySelector('.popup__view-image');
            this._figcaption = document.querySelector('.popup__figcaption');
        }
    open() {        
        this._imageViewWindow.src = event.target.src;
        this._imageViewWindow.alt = event.target.alt;
        this._figcaption.textContent = event.target.alt;

        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', () => {this._handleEscClose()});
    }
}