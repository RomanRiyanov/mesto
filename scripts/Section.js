import {closePopup} from './utils/utils.js';
import {popupAddPhoto}  from './utils/constants.js';

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

    addItem () {
        event.preventDefault();
        this._cardsContainer.prepend( this._renderer(this._items) );
        closePopup(popupAddPhoto);
    }
}
