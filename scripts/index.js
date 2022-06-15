export {openImageView};
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {
  initialCards,
  validationConfig,
  popupAddPhoto,
  popupAddPhotoForm,
  photoAddCloseButton,
  cardsContainer,
  placeInput,
  urlInput
} from './utils/constants.js';

//переменные и константы
//окно редактирования имени профиля

const popupEditProfile = document.querySelector('#popup_eidt-profile');
const popupFormEditProfile = popupEditProfile.querySelector('#popup__form_edit-profile');
const popupEditProfileCloseButton = document.querySelector('#close-button_eidt-profile');
const buttonEditProfile = document.querySelector('.edit-button');
const buttonAddPhoto = document.querySelector('.add-button');

const popupList = Array.from(document.querySelectorAll('.popup'));

const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const nameInput = popupFormEditProfile.querySelector('.popup__input[name=user]');
const jobInput = popupFormEditProfile.querySelector('.popup__input[name=profession]');

//окно открытия просмотра фотографии

const imageViewPopup = document.querySelector('#popup_view-photo');
const imageViewCloseButton = document.querySelector('#close-button_view-photo');
const imageViewWindow = document.querySelector('.popup__view-image');
const figcaption = document.querySelector('.popup__figcaption');

//функции
//функции редактирования имени профиля

function openPopup(popup) {
  popup.classList.add('popup_viewable');
  document.addEventListener('keydown', closePopapByPressEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_viewable');
  document.removeEventListener('keydown', closePopapByPressEscape);
}

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

//функция создания новой карточки

function createCard (item) {
  const card = new Card (item, '#element');
  return card.createNewElement();
}

//функция добавления новой фотографии

function addPhotoOnPage(event) {
  event.preventDefault();

  const item = {
    name: placeInput.value,
    link: urlInput.value
  }

  cardsContainer.prepend( createCard(item) );

  closePopup(popupAddPhoto);
}

//функция закрытия по клику на темном фоне

function closePopapByPressOnOverlay (popup) {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  }
}

//функция закрытия по нажатию на Escape

function closePopapByPressEscape () {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_viewable');
    closePopup(openedPopup);
  }
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
});

popupAddPhotoForm.addEventListener('submit', () => {addPhotoOnPage(event)});

photoAddCloseButton.addEventListener('click', () => {closePopup(popupAddPhoto)});

//рендер всей страницы

const viewedEditProfileWindow = new FormValidator (validationConfig, popupFormEditProfile);
const viewedAddPhotoWindow = new FormValidator (validationConfig, popupAddPhotoForm);

viewedEditProfileWindow.enableValidation();
viewedAddPhotoWindow.enableValidation();

initialCards.forEach((item) => {
  cardsContainer.prepend( createCard(item) );
});