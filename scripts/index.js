export {openImageView};
import {FormValidator} from './FormValidator.js';
//import {Card} from './Card.js';
import {Section} from './Section.js';

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

//функции

function editProfile(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

//функции открытия просмотра фотографии

function openImageView() {
  imageViewWindow.src = event.target.src;
  imageViewWindow.alt = event.target.alt;
  figcaption.textContent = event.target.alt;
  
  openPopup(imageViewPopup);
}

//обработчики событий
//обработчики редактирования имени профиля

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

popupEditProfileCloseButton.addEventListener('click', () => {closePopup(popupEditProfile)});

popupFormEditProfile.addEventListener('submit', editProfile);

//обработчики закрытия просмотра фотографии

imageViewCloseButton.addEventListener('click', () => {closePopup(imageViewPopup)});

//обработчик закрытия попапа по клику на темном фоне

popupList.forEach((popup) => {
  popup.addEventListener('click', () => {closePopapByPressOnOverlay(popup)});
});

//обработчики добавления новой фотографии

buttonAddPhoto.addEventListener('click', () => {
  openPopup(popupAddPhoto);
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

photoAddCloseButton.addEventListener('click', () => {closePopup(popupAddPhoto)});

//рендер всей страницы

const viewedEditProfileWindow = new FormValidator (validationConfig, popupFormEditProfile);
const viewedAddPhotoWindow = new FormValidator (validationConfig, popupAddPhotoForm);
viewedEditProfileWindow.toggleButtonState();
viewedAddPhotoWindow.toggleButtonState();

viewedEditProfileWindow.enableValidation();
viewedAddPhotoWindow.enableValidation();

const cardData = {
  items: initialCards, 
  renderer: createCard
};
const section = new Section (cardData, '.elements');
section.renderAllPage();