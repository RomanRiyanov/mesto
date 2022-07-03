import './index.css';
import {Popup} from '../components/Popup.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import {
  initialCards,
  validationConfig,
  popupAddPhotoForm,
  popupFormEditProfile,
  buttonEditProfile,
  buttonAddPhoto,
} from '../utils/constants.js';

//функции

function createCard (item) {
  const card = new Card (
    item,
    '#element',
    () => imageViewPopupElement.open(item),
    () => deletingPhotoConfirmPopap.open()
    //() => console.log('Press trash')
  );
  return card.createNewElement();
}

function renderCard (data) {
  const card = createCard(data);
  section.addItem(card);
}

//установка слушателей на попап просмотра фотографий

const imageViewPopupElement = new PopupWithImage ('#popup_view-photo');
imageViewPopupElement.setEventListeners();

//установка слушателей на попапы

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle'
});
const userInfoPopup = new PopupWithForm({
  popupSelector: '#popup_edit-profile',
  submitFormHandler: userInfo.setUserInfo.bind(userInfo)
});
const addedPhotoPopup = new PopupWithForm({
  popupSelector: '#popup_add-photo',
  submitFormHandler: ({place, imageUrl }) => section.addItem(createCard({ name: place, link: imageUrl }))
});




const deletingPhotoConfirmPopap = new Popup('#popup_delete-photo');
deletingPhotoConfirmPopap.setEventListeners();




buttonEditProfile.addEventListener('click', () => userInfoPopup.open(userInfo.getUserInfo()));
buttonAddPhoto.addEventListener('click', () => {
  addedPhotoPopup.open({ place: '', imageUrl: ''});
  viewedAddPhotoWindow.toggleButtonState();
});
addedPhotoPopup.setEventListeners();
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
  renderer: renderCard
};
const section = new Section (cardData, '.elements');
section.renderAllPage(initialCards);