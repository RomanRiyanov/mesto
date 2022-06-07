class Card {

    constructor (data, templateSelector) {
        this.data = data;
        this.templateSelector = templateSelector;

        //окно добавления новой карточки с фотографией

        this.addPhotoPopup = document.querySelector('#popup_add-photo');
        this.addPhotoPopupForm = document.querySelector('#popup__form_add-photo');
        this.addPhotoCloseButton = document.querySelector('#close-button_add-photo');

        this.placeInput = this.addPhotoPopupForm.querySelector('.popup__input[name=place]');
        this.urlInput = this.addPhotoPopupForm.querySelector('.popup__input[name=image-url]');

        //элементы новой карточки

        this.cardsContainer = document.querySelector('.elements'); 
        this.elementTemplate = 
            document.querySelector(`#${this.templateSelector}`).
            content.querySelector(`.${this.templateSelector}`);
        
        this.addButton = document.querySelector('.add-button');
    }

    //функции добавления новой карточки с фотографией

    _addPhotoOnPage(event) {
        event.preventDefault();
    
        this.__addNewElementOnStart({name: this.placeInput.value, link: this.urlInput.value});
    
        closePopup(this.addPhotoPopup);
    }
    
    __addNewElementOnStart = (item) => {
    this.cardsContainer.prepend(this._createNewElement(item));
    };
    
    //функции генерации новой карточки
    
    _createNewElement = (item) => {
        const element = this.elementTemplate.cloneNode(true);
    
        const elementPhoto = element.querySelector('.element__photo');
        elementPhoto.src = item.link;
        elementPhoto.addEventListener('click', openImageView);
    
        const elementTitle = element.querySelector('.element__title');
        elementTitle.textContent = item.name;
    
        elementPhoto.alt = elementTitle.textContent;
    
        const likeButton = element.querySelector('.like-button');
        likeButton.addEventListener('click', this._likeButtonHandler);
    
        const deleteButton = element.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            this._deleteButtonHandler(event, this.templateSelector);
        });
    
        return element;
    }
    
    _likeButtonHandler = function (event) {
    event.target.classList.toggle('like-button_active');
    }
    
    _deleteButtonHandler = function (event, templateSelector) {
        event.target.closest(`.${templateSelector}`).remove();
    }
    
    _addNewElement = (item) => {
        this.cardsContainer.append(this._createNewElement(item));
    };
    
    //обработчики добавления новой карточки с фотографией

    render() {
        addButton.addEventListener('click', () => {
            openPopup(this.addPhotoPopup);
            this.addPhotoPopupForm.reset();
        
            const buttonElement = this.addPhotoPopup.querySelector('.submit-button');
            buttonElement.classList.add('inactive-button');
            buttonElement.setAttribute('disabled', true);
        });
        
        this.addPhotoCloseButton.addEventListener('click', () => {closePopup(this.addPhotoPopup)});
        
        this.addPhotoPopupForm.addEventListener('submit', () => {this._addPhotoOnPage(event)});
        
        this.data.forEach((item) => {
            this._addNewElement(item);
        });
        }
}

const example = new Card (initialCards, 'element');

example.render();