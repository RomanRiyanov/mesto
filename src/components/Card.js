import {Popup} from '../components/Popup.js';
import { Api } from './Api.js';
export class Card {
    constructor (data, templateSelector, { handleCardClick, handleDeleteCard, handleLikeClick , userId }) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
        this._userId = userId;
    }

    _getTemplate() {
        const element = 
        document.querySelector(`${this._templateSelector}`)
            .content.querySelector('.element')
            .cloneNode(true);
        return element;
    }

    _setEventListeners() {
        this._elementPhoto.addEventListener('click', this._handleCardClick.bind(this)); 

        this._element.querySelector('.like-button').addEventListener('click', () => {
            const likeButton = this._element.querySelector('.like-button');
            this._handleLikeClick(!likeButton.classList.contains('like-button_active'));
        });
        const deleteButton = this._element.querySelector('.delete-button');

        if (this._userId === this._data.owner._id) {
            deleteButton.addEventListener('click', this._handleDeleteCard);
        } else {
            deleteButton.style.display = 'none';
        }
        
        
        
   

        //this._element.querySelector('.delete-button').addEventListener('click', this._deleteConfirm.bind(this));


    //     document.querySelector('.popup__window_type_confirmation').addEventListener('submit', (event) => {
    //         //this._deleteConfirm();
    //         event.preventDefault();
    //         console.log(event.target.closest('.element'));
    //         //event.target.closest('.element').remove();
    //         // console.log('удаление вот тут');
    //         // this._deleteCard.bind(this);
    //     });
     }

    // _likeButtonHandler = function (event) {
    //     event.target.classList.toggle('like-button_active');

    // }
    
    delete = () => {
        this._element.remove();
        this._element = null;
    }
    
    _updateCardData() {
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementPhoto.src = this._data.link;
        
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementTitle.textContent = this._data.name;

        this._elementLikes = this._element.querySelector('.like_counter');
        this._elementLikes.textContent = this._data.likes.length;

        this._likeButton = this._element.querySelector('.like-button');
        const isLikeActive = this._data.likes.find((like) => (this._userId === like._id));
        
        if (isLikeActive) {
            this._likeButton.classList.add('like-button_active');
        } else {
            this._likeButton.classList.remove('like-button_active');
        }
    
        this._elementPhoto.alt = this._elementTitle.textContent;
    }

    updateCardData(item) {
        this._data = item;
        this._updateCardData();
    }

    createNewElement = () => {
        this._element = this._getTemplate();
        this._updateCardData();
   
        this._setEventListeners();
        return this._element;
    }
}