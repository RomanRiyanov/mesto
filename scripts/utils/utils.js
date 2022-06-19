import {Card} from '../Card.js';

//функция создания новой карточки

export function createCard (item) {
    const card = new Card (item, '#element');
    return card.createNewElement();
  }

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
  
  