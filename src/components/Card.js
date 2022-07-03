import {Popup} from '../components/Popup.js';
export class Card {
    constructor (data, templateSelector, handleCardClick/*, deleteConfirm*/) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        // this._deleteConfirm = deleteConfirm;
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

        this._element.querySelector('.like-button').addEventListener('click', this._likeButtonHandler);

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            const deletingPhotoConfirmPopap = new Popup('#popup_delete-photo');
           до deletingPhotoConfirmPopap.setEventListeners();
            deletingPhotoConfirmPopap.open();
            document.querySelector('.confirm-button').addEventListener('click', (event) => {
                event.preventDefault();
                this._deleteButtonHandler.call(this);
                console.log(this);
                deletingPhotoConfirmPopap.close();
            })
            // this._deleteConfirm();

            // this._deleteButtonHandler();
        });

        //this._element.querySelector('.delete-button').addEventListener('click', this._deleteConfirm.bind(this));


    //     document.querySelector('.popup__window_type_confirmation').addEventListener('submit', (event) => {
    //         //this._deleteConfirm();
    //         event.preventDefault();
    //         console.log(event.target.closest('.element'));
    //         //event.target.closest('.element').remove();
    //         // console.log('удаление вот тут');
    //         // this._deleteButtonHandler.bind(this);
    //     });
     }

    _likeButtonHandler = function (event) {
    event.target.classList.toggle('like-button_active');
    }
    
    _deleteButtonHandler = () => {
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