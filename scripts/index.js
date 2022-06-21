export { /*popupAddPhotoElement popupWithForm */userInfoPopup, popupEditProfileElement};
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

import {
  initialCards,
  validationConfig,
  popupAddPhotoForm,
  placeInput,
  urlInput,
  popupFormEditProfile,
  buttonEditProfile,
  buttonAddPhoto,
  profileName,
  profileInfo,
  nameInput,
  jobInput,
} from './utils/constants.js';

// import {
//   createCard,
//   editProfile,
//   submitFormHandler
// } from './utils/utils.js';




//установка слушателей на попапы

const popupEditProfileElement = new Popup ('#popup_edit-profile');
const popupAddPhotoElement = new Popup ('#popup_add-photo');
export const imageViewPopupElement = new PopupWithImage ('#popup_view-photo');

popupEditProfileElement.setEventSisteners();
popupAddPhotoElement.setEventSisteners();

imageViewPopupElement.setEventSisteners();



//функции
function createCard (item) {
  const card = new Card (item, '#element', imageViewPopupElement.open.bind(imageViewPopupElement));
  return card.createNewElement();
}

/*
buttonEditProfile.addEventListener('click', () => {
  popupEditProfileElement.open();

  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

popupFormEditProfile.addEventListener('submit', editProfile);

*/

const userInfo = new UserInfo({
  userNameSelector: '#name-input',
  userDescriptionSelector: '#profession-input'
});

const userInfoPopup = new PopupWithForm({
  popupSelector: '#popup_edit-profile',
  submitFormHandler: userInfo.setUserInfo.bind(userInfo)
});

buttonEditProfile.addEventListener('click', () => userInfoPopup.open(userInfo.getUserInfo()));

const addedPhotoPopap = new PopupWithForm({
  popupSelector: '#popup_add-photo',
  submitFormHandler: ({place, "image-url": imageUrl }) => section.addItem(createCard({ name: place, link: imageUrl }))
});

buttonAddPhoto.addEventListener('click', () => addedPhotoPopap.open({ place: '', "image-url": ''}));

addedPhotoPopap.setEventListeners();

userInfoPopup.setEventListeners();
//обработчики добавления новой фотографии
/*
//buttonAddPhoto.addEventListener('click', () => {
 // popupAddPhotoElement.open();

  //popupAddPhotoForm.reset();

  //viewedAddPhotoWindow.toggleButtonState();
});
*/
// popupAddPhotoForm.addEventListener('submit', () => {
//   const popupAddPhotoFormValue = {
//     name: placeInput.value,
//     link: urlInput.value
//   }

//   const aloneCardData = {
//     items: popupAddPhotoFormValue, 
//     renderer: createCard
//   }

//   const aloneCardRender = new Section (aloneCardData, '.elements');
//   aloneCardRender.addItem();
// });

//const popupWithForm = new PopupWithForm('#popup_add-photo', submitFormHandler);
//popupWithForm.setEventListeners();

//рендер всей страницы
//установка валидации

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
