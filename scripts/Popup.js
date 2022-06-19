export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
    }
    
    _handleEscClose () {
        if (event.key === 'Escape') {
          //const openedPopup = document.querySelector('.popup_viewable');
          this.closePopup();
        }
    }
/*
    _closePopapByPressOnOverlay (popup) {
        if (event.target === event.currentTarget) {
          closePopup(popup);
        }
    }
*/
    openPopup() {
        this._popup.classList.add('popup_viewable');
        document.addEventListener('keydown', () => {this._handleEscClose});
    }

    closePopup() {
        this._popup.classList.remove('popup_viewable');
        document.removeEventListener('keydown', () =>  {this._handleEscClose});
    }

    setEventSisteners() {
        const closeButton = document.querySelector('#close-button' + this._popupSelector.slice(6));
        closeButton.addEventListener('click', () => {
            this.closePopup();
        });
        this._popup.addEventListener('keydown', () => {
            console.log('я тута');
            this._handleEscClose();
        });
    }
}
/*
export const popupEditProfile = document.querySelector('#popup_edit-profile');
export const imageViewPopup = document.querySelector('#popup_view-photo');
export const popupAddPhoto = document.querySelector('#popup_add-photo');

//функции открытия и закрытия попапа

export function openPopup(popup) {
    popup.classList.add('popup_viewable');
    document.addEventListener('keydown', closePopapByPressEscape);
  }
  
  export function closePopup(popup) {
    popup.classList.remove('popup_viewable');
    document.removeEventListener('keydown', closePopapByPressEscape);
  }

//функция закрытия по клику на темном фоне

export function closePopapByPressOnOverlay (popup) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  }
  
  //функция закрытия по нажатию на Escape
  
 export  function closePopapByPressEscape () {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_viewable');
      closePopup(openedPopup);
    }
  }
*/