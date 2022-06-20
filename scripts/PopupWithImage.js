import {Popup} from './Popup.js';

import {imageViewWindow, figcaption} from './utils/constants.js';
   
export class PopupWithImage extends Popup {
    open() {        
        imageViewWindow.src = event.target.src;
        imageViewWindow.alt = event.target.alt;
        figcaption.textContent = event.target.alt;

        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', () => {this._handleEscClose()});
    }
}