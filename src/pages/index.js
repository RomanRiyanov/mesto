import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { PopupWithAvatar } from '../components/PopupWithAvatar';
import { PopupDeletePhoto } from '../components/PopupDeletePhoto';
import { Api } from '../components/Api';
import { setLoading } from '../utils/utils.js';

import {
  validationConfig,
  popupAddPhotoForm,
  popupFormEditProfile,
  buttonEditProfile,
  buttonAddPhoto,
  profileAvatar,
  popupFormProfileAvatar,
  submitButtonText
} from '../utils/constants.js';

//функции и константы

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

function createCard (item) {
  const card = new Card (
    item,
    '#element',
    { 
      handleCardClick: () => imageViewPopupElement.open(item),
      handleDeleteCard: () => {
        deletingPhotoConfirmPopap.open(() => {
          api.deleteCard(item._id).then(() => {
            setLoading('#popup_delete-photo', true, submitButtonText.deleteCard);
            card.delete();
            deletingPhotoConfirmPopap.close();
          })
          .finally(
            setLoading('#popup_delete-photo', false, submitButtonText.deleteCard)
          )
          .catch((err) => {
            console.log(err);
          }); 
      });
    },
      handleLikeClick: (newValue) => api[newValue ? 'likeCard' : 'unLikeCard'](item._id).then(res => card.updateCardData(res)),
      userId: userInfo.getUserInfo().id
    }
  );
  return card.createNewElement();
}

function renderCard (data) {
  const card = createCard(data);
  section.addItem(card);
}

// вызов сервера через методы api

const apiGetUserInfo = api.getUserInfo();

const apigetCards = api.getCards();

Promise.all([apigetCards, apiGetUserInfo])
  .then(([cards, userData]) => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);

      const addedAvatarPopup = new PopupWithAvatar({
        popupSelector: '#popup_add-avatar',
        submitFormHandler: (avatar) => {
          api.setUserAvatar(avatar)
          .then((dataForAvatar) => {
            setLoading('#popup_add-avatar', true, submitButtonText.newCard);
            userInfo.setUserInfo(dataForAvatar.name, dataForAvatar.about, dataForAvatar.avatar, dataForAvatar._id);
            addedAvatarPopup.close()
          })
          .finally(
            setLoading('#popup_add-avatar', false, submitButtonText.newCard)
          )
          .catch(err => {
            console.log(err)
          })
        }
      });
      profileAvatar.addEventListener('click', ()=> {
        addedAvatarPopup.open({avatarUrl: ''});
        viewedAddedAvatarPopup.resetValidation();
      });
      //валидация формы изменения аватара
      const viewedAddedAvatarPopup = new FormValidator (validationConfig, popupFormProfileAvatar);
      viewedAddedAvatarPopup.enableValidation();
      viewedAddedAvatarPopup.toggleButtonState();
      addedAvatarPopup.setEventListeners();

      section.renderAllPage(cards);
    })
  .catch(err => {
    console.log(err)
});

//инициализация попапов с вызовом api в колбэке

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle',
  userIdDefault: userId
});

const userInfoPopup = new PopupWithForm({
  popupSelector: '#popup_edit-profile',
  submitFormHandler: (data) => {
    api.setUserInfo(data)
    .then((res) => {
      setLoading('#popup_edit-profile', true, submitButtonText.newCard);
      userInfo.setUserInfo( res.name, res.about, res.avatar, res._id );
      userInfoPopup.close();
    })
    .finally(
      setLoading('#popup_edit-profile', false, submitButtonText.newCard)
    )
    .catch((err) => {
      console.log(err);
    }); 
  }
});
userInfoPopup.setEventListeners();

const addedPhotoPopup = new PopupWithForm({
  popupSelector: '#popup_add-photo',
  submitFormHandler: (inputValues) => {
    api.addNewCard(inputValues)
    .then((res) => {
      setLoading('#popup_add-photo', true, submitButtonText.newCard);
      renderCard(res)
      addedPhotoPopup.close();
    })
    .finally( 
      setLoading('#popup_add-photo', false, submitButtonText.newCard)
    )
    .catch((err) => {
      console.log(err); 
    }); 
  }
});
addedPhotoPopup.setEventListeners();

// установка слушателей на попап удаления фотографии

const deletingPhotoConfirmPopap = new PopupDeletePhoto ('#popup_delete-photo');
deletingPhotoConfirmPopap.setEventListeners();

//установка слушателей на попап просмотра фотографий

const imageViewPopupElement = new PopupWithImage ('#popup_view-photo');
imageViewPopupElement.setEventListeners();

//установка слушателей на кнопки открытия попапов

buttonEditProfile.addEventListener('click', () => {
  userInfoPopup.open(userInfo.getUserInfo());
  viewedEditProfileWindow.resetValidation();
});

buttonAddPhoto.addEventListener('click', () => {
  addedPhotoPopup.open({ place: '', imageUrl: ''});
  viewedAddPhotoWindow.resetValidation();
});

//установка валидации на все формы

const viewedEditProfileWindow = new FormValidator (validationConfig, popupFormEditProfile);
const viewedAddPhotoWindow = new FormValidator (validationConfig, popupAddPhotoForm);

viewedEditProfileWindow.enableValidation();
viewedAddPhotoWindow.enableValidation();

viewedEditProfileWindow.toggleButtonState();
viewedAddPhotoWindow.toggleButtonState();