import {Card} from '../Card.js';
import {Section} from '../Section.js';

import {
  profileName,
  profileInfo,
  nameInput,
  jobInput
} from './constants.js';
import {popupEditProfileElement} from '../index.js';
//функция создания новой карточки

export function createCard (item) {
    const card = new Card (item, '#element');
    return card.createNewElement();
  }

//функция редактирования профиля

export function editProfile(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    //closePopup(popupEditProfile);
    popupEditProfileElement.close();
}

//функция обработчик отправки формы добавления фото

export function submitFormHandler(data) {
  const aloneCardData = {
    items: data, 
    renderer: createCard
  }

  const aloneCardRender = new Section (aloneCardData, '.elements');
  aloneCardRender.addItem();
}
