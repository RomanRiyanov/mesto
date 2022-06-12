import {openImageView} from './index.js';

export class Card {
    constructor (data, templateSelector) {
        this._data = data;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const element = 
        document.querySelector(`#${this._templateSelector}`).
        content.querySelector(`.${this._templateSelector}`).
        cloneNode(true);

        return element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', openImageView);

        this._element.querySelector('.like-button').addEventListener('click', this._likeButtonHandler);

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._deleteButtonHandler(event, this._templateSelector);
        });
    }

    _likeButtonHandler = function (event) {
    event.target.classList.toggle('like-button_active');
    }
    
    _deleteButtonHandler = function (event, templateSelector) {
        event.target.closest(`.${templateSelector}`).remove();
    }
    
    createNewElement = () => {
        this._element = this._getTemplate();
        this._setEventListeners();

        const elementPhoto = this._element.querySelector('.element__photo');
        elementPhoto.src = this._data.link;
    
        const elementTitle = this._element.querySelector('.element__title');
        elementTitle.textContent = this._data.name;
    
        elementPhoto.alt = elementTitle.textContent;
    
        return this._element;
    }
}
