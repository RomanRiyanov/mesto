import './index.css';
import {Popup} from '../components/Popup.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { PopupWithAvatar } from '../components/PopupWithAvatar';
import { Api } from '../components/Api';

import {
  validationConfig,
  popupAddPhotoForm,
  popupFormEditProfile,
  buttonEditProfile,
  buttonAddPhoto,
  profileAvatar,
  popupFormProfileAvatar
} from '../utils/constants.js';

//функции

function createCard (item) {
  const card = new Card (
    item,
    '#element',
    { 
      handleCardClick: () => imageViewPopupElement.open(item),
      handleDeleteCard: () => deletingPhotoConfirmPopap.open(() => {
        deletingPhotoConfirmPopap.setLoading(true);
        api.deleteCard(item._id).then(() => {
          card.delete();
          deletingPhotoConfirmPopap.setLoading(false);
          deletingPhotoConfirmPopap.close();
        })
      }),
      handleLikeClick: (newValue) => api[newValue ? 'likeCard' : 'unLikeCard'](item._id).then(res => card.updateCardData(res)),
      userId
    }
  );
  return card.createNewElement();
}

function renderCard (data) {
  const card = createCard(data);
  section.addItem(card);
}

//константы и переменные

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '6b29f5e5-c172-4a06-806f-c42366ee7092',
    'Content-Type': 'application/json'
  }
}

const api = new Api (apiConfig);
const section = new Section (renderCard, '.elements');

let userId = null;

// вызов сервера через методы api

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    profileAvatar.src = res.avatar;
    const addedAvatarPopup = new PopupWithAvatar({
      popupSelector: '#popup_add-avatar',
      submitFormHandler: (avatar) => {
        api.setUserAvatar(avatar)
        .then(({avatar}) => {
          profileAvatar.src = avatar;
        });
      }
    });
    profileAvatar.addEventListener('click', ()=> {
      addedAvatarPopup.open({avatarUrl: ''});
    });
    //валидация формы изменения аватара
    const viewedAddedAvatarPopup = new FormValidator (validationConfig, popupFormProfileAvatar);
    viewedAddedAvatarPopup.enableValidation();
    viewedAddedAvatarPopup.toggleButtonState();
    addedAvatarPopup.setEventListeners();
  })

 
api.getCards()
  .then((res) => {
      section.renderAllPage(res);
  });

//инициализация попапов с вызовом api в колбэке

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle'
});

const userInfoPopup = new PopupWithForm({
  popupSelector: '#popup_edit-profile',
  submitFormHandler: (data) => {
    userInfoPopup.setLoading(true);
    api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo( res.name, res.about);
      userId = res._id;
      userInfoPopup.setLoading(false);
      userInfoPopup.close();
    })
  }
});
userInfoPopup.setEventListeners();

const addedPhotoPopup = new PopupWithForm({
  popupSelector: '#popup_add-photo',
  submitFormHandler: (inputValues) => {
    addedPhotoPopup.setLoading(true);
    api.addNewCard(inputValues)
    .then((res) => {
      renderCard(res)
      addedPhotoPopup.setLoading(false);
      addedPhotoPopup.close();
    })
  }
});
addedPhotoPopup.setEventListeners();

// установка слушателей на попап удаления фотографии

const deletingPhotoConfirmPopap = new Popup('#popup_delete-photo');
deletingPhotoConfirmPopap.setEventListeners();

//установка слушателей на попап просмотра фотографий

const imageViewPopupElement = new PopupWithImage ('#popup_view-photo');
imageViewPopupElement.setEventListeners();

//установка слушателей на кнопки открытия попапов

buttonEditProfile.addEventListener('click', () => userInfoPopup.open(userInfo.getUserInfo()));

buttonAddPhoto.addEventListener('click', () => {
  addedPhotoPopup.open({ place: '', imageUrl: ''});
  viewedAddPhotoWindow.toggleButtonState();
});

//установка валидации на все формы

const viewedEditProfileWindow = new FormValidator (validationConfig, popupFormEditProfile);
const viewedAddPhotoWindow = new FormValidator (validationConfig, popupAddPhotoForm);

viewedEditProfileWindow.enableValidation();
viewedAddPhotoWindow.enableValidation();

viewedEditProfileWindow.toggleButtonState();
viewedAddPhotoWindow.toggleButtonState();