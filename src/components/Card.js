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
        this._elementPhoto = this._element.querySelector('.element__photo');

        this._elementTitle = this._element.querySelector('.element__title');        
        this._elementLikes = this._element.querySelector('.like_counter');
        this._likeButton = this._element.querySelector('.like-button');
        this._deleteButton = this._element.querySelector('.delete-button');

        this._elementPhoto.addEventListener('click', this._handleCardClick.bind(this)); 

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(!this._likeButton.classList.contains('like-button_active'));
        });

        if (this._userId === this._data.owner._id) {
            this._deleteButton.addEventListener('click', this._handleDeleteCard);
        } else {
            this._deleteButton.style.display = 'none';
        }
     }

    delete = () => {
        this._element.remove();
        this._element = null;
    }
    
    _updateCardData() {
        this._elementPhoto.src = this._data.link;
        
        this._elementTitle.textContent = this._data.name;

        this._elementLikes.textContent = this._data.likes.length;

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
        this._setEventListeners();
        this._updateCardData();            
        return this._element;
    }
}