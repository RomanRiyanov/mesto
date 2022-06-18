import {openImageView} from './index.js';

export class Card {
    constructor (data, templateSelector) {
        this._data = data;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const element = 
        document.querySelector(`${this._templateSelector}`).
        content.querySelector('.element').
        cloneNode(true);

        return element;
    }

    _setEventListeners() {
        this._elementPhoto.addEventListener('click', openImageView); 

        this._element.querySelector('.like-button').addEventListener('click', this._likeButtonHandler);

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._deleteButtonHandler();
        });
    }

    _likeButtonHandler = function (event) {
    event.target.classList.toggle('like-button_active');
    }
    
    _deleteButtonHandler = function () {
        this._element.remove();
        this._element = null;
    }
    
    createNewElement = () => {
        this._element = this._getTemplate();
        
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementPhoto.src = this._data.link;
        
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementTitle.textContent = this._data.name;
    
        this._elementPhoto.alt = this._elementTitle.textContent;
   
        this._setEventListeners();
        return this._element;
    }
}