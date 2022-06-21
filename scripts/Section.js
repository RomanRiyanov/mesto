//import {closePopup} from './utils/utils.js';
import {popupAddPhoto}  from './utils/constants.js';
import {/*popupAddPhotoElement popupWithForm */userInfoPopup}  from './index.js';
import { Card } from './Card.js';


export class Section {
    constructor (data, containerSelector) {
        this._items = data.items;
        this._renderer = data.renderer;
        this._cardsContainer = document.querySelector(containerSelector);
    }

    renderAllPage () {
        this._items.forEach((item) => {
            this._cardsContainer.prepend( this._renderer(item) );
        });
    }

    addItem (cardItem) {
        //event.preventDefault();
        this._cardsContainer.prepend(cardItem);
        //closePopup(popupAddPhoto);
        //popupAddPhotoElement.close();
        //popupWithForm.close();
        // userInfoPopup.close();
    }
}
