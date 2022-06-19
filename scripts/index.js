export {openImageView};
import {FormValidator} from './FormValidator.js';
//import {Card} from './Card.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';

import {
  initialCards,
  validationConfig,
  popupAddPhoto,
  popupAddPhotoForm,
  photoAddCloseButton,
  placeInput,
  urlInput,
  popupEditProfile,
  popupFormEditProfile,
  popupEditProfileCloseButton,
  buttonEditProfile,
  buttonAddPhoto,
  popupList,
  profileName,
  profileInfo,
  nameInput,
  jobInput,
  imageViewPopup,
  imageViewCloseButton,
  imageViewWindow,
  figcaption
} from './utils/constants.js';

import {
  createCard,
  closePopup,
  openPopup,
  closePopapByPressOnOverlay,
} from './utils/utils.js';


//установка слушателей на попапы

const popupEditProfileElement = new Popup ('#popup_edit-profile');
const imageViewPopupElement = new Popup ('#popup_view-photo');
const popupAddPhotoElement = new Popup ('#popup_add-photo');

popupEditProfileElement.setEventSisteners();
imageViewPopupElement.setEventSisteners();
popupAddPhotoElement.setEventSisteners();



//функции

function editProfile(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    //closePopup(popupEditProfile);
    popupEditProfileElement.closePopup();
}

//функции открытия просмотра фотографии

function openImageView() {
  imageViewWindow.src = event.target.src;
  imageViewWindow.alt = event.target.alt;
  figcaption.textContent = event.target.alt;
  
  //openPopup(imageViewPopup);
  imageViewPopupElement.openPopup();
}

//обработчики событий
//обработчики редактирования имени профиля

buttonEditProfile.addEventListener('click', () => {
  //openPopup(popupEditProfile);
  popupEditProfileElement.openPopup();

  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

//popupEditProfileCloseButton.addEventListener('click', () => {closePopup(popupEditProfile)});

popupFormEditProfile.addEventListener('submit', editProfile);

//обработчики закрытия просмотра фотографии

//imageViewCloseButton.addEventListener('click', () => {closePopup(imageViewPopup)});

//обработчик закрытия попапа по клику на темном фоне

popupList.forEach((popup) => {
  popup.addEventListener('click', () => {
    //closePopapByPressOnOverlay(popup)
    imageViewPopupElement.closePopup();
  });
});

//обработчики добавления новой фотографии

buttonAddPhoto.addEventListener('click', () => {
  //openPopup(popupAddPhoto);
  popupAddPhotoElement.openPopup();

  popupAddPhotoForm.reset();

  viewedAddPhotoWindow.toggleButtonState();
});

popupAddPhotoForm.addEventListener('submit', () => {
  const popupAddPhotoFormValue = {
    name: placeInput.value,
    link: urlInput.value
  }

  const aloneCardData = {
    items: popupAddPhotoFormValue, 
    renderer: createCard
  }

  const aloneCardRender = new Section (aloneCardData, '.elements');
  aloneCardRender.addItem();
});

//photoAddCloseButton.addEventListener('click', () => {closePopup(popupAddPhoto)});

//рендер всей страницы
//установка валидации

const viewedEditProfileWindow = new FormValidator (validationConfig, popupFormEditProfile);
const viewedAddPhotoWindow = new FormValidator (validationConfig, popupAddPhotoForm);
viewedEditProfileWindow.toggleButtonState();
viewedAddPhotoWindow.toggleButtonState();

viewedEditProfileWindow.enableValidation();
viewedAddPhotoWindow.enableValidation();

//отрисовка элементов на страницу

const cardData = {
  items: initialCards, 
  renderer: createCard
};
const section = new Section (cardData, '.elements');
section.renderAllPage();
