import './pages/index.css';
import {Card} from './scripts/Card.js';
import {FormValidator} from './scripts/FormValidator.js';
import {Section} from './scripts/Section.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import {UserInfo} from './scripts/UserInfo.js';

import {
  initialCards,
  validationConfig,
  popupAddPhotoForm,
  popupFormEditProfile,
  buttonEditProfile,
  buttonAddPhoto,
} from './scripts/utils/constants.js';

//функции

function createCard (item) {
  const card = new Card (item, '#element', imageViewPopupElement.open.bind(imageViewPopupElement));
  return card.createNewElement();
}
//установка слушателей на попап просмотра фотографий

const imageViewPopupElement = new PopupWithImage ('#popup_view-photo');
imageViewPopupElement.setEventSisteners();

//установка слушателей на попапы

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle'
});
const userInfoPopup = new PopupWithForm({
  popupSelector: '#popup_edit-profile',
  submitFormHandler: userInfo.setUserInfo.bind(userInfo)
});
const addedPhotoPopap = new PopupWithForm({
  popupSelector: '#popup_add-photo',
  submitFormHandler: ({place, imageUrl }) => section.addItem(createCard({ name: place, link: imageUrl }))
});

buttonEditProfile.addEventListener('click', () => userInfoPopup.open(userInfo.getUserInfo()));
buttonAddPhoto.addEventListener('click', () => {
  addedPhotoPopap.open({ place: '', imageUrl: ''});
  viewedAddPhotoWindow.toggleButtonState();
});
addedPhotoPopap.setEventListeners();
userInfoPopup.setEventListeners();

//установка валидации на все формы

const viewedEditProfileWindow = new FormValidator (validationConfig, popupFormEditProfile);
const viewedAddPhotoWindow = new FormValidator (validationConfig, popupAddPhotoForm);

viewedEditProfileWindow.enableValidation();
viewedAddPhotoWindow.enableValidation();

viewedEditProfileWindow.toggleButtonState();
viewedAddPhotoWindow.toggleButtonState();

//отрисовка элементов на страницу

const cardData = {
  items: initialCards, 
  renderer: createCard
};
const section = new Section (cardData, '.elements');
section.renderAllPage();
