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
  initialCards,
  validationConfig,
  popupAddPhotoForm,
  popupFormEditProfile,
  buttonEditProfile,
  buttonAddPhoto,
  profileAvatar,
  confirmButton
} from '../utils/constants.js';


const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '6b29f5e5-c172-4a06-806f-c42366ee7092',
    'Content-Type': 'application/json'
  }
}

const api = new Api (apiConfig);

let userId = null;

api.getUserInfo()
  .then((res) => {
    console.log(res);
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
    profileAvatar.src = res.avatar;
    const addedAvatarPopup = new PopupWithAvatar({
      popupSelector: '#popup_add-avatar',
      submitFormHandler: (avatar) => {
        api.setUserAvatar(avatar)
        .then(({avatar}) => {
          profileAvatar.src = avatar
        });   
      }
    });
    profileAvatar.addEventListener('click', ()=> {
      addedAvatarPopup.open({avatarUrl: ''});
    });
    addedAvatarPopup.setEventListeners();
  })

  
// api.setUserInfo(userInfoPopup._getInputValues())
//   .then((res) => {
//     console.log(res)
//   })


const section = new Section (renderCard, '.elements');

api.getCards()
  .then((res) => {
      section.renderAllPage(res);
  });







//функции

const deletingPhotoConfirmPopap = new Popup('#popup_delete-photo');
deletingPhotoConfirmPopap.setEventListeners();



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

    // () => {
    //   deletingPhotoConfirmPopap.open(),
     // this._deleteButtonHandler.bind(this);
  //  }
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
  //submitFormHandler: userInfo.getUserInfo.bind(userInfo)
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
const addedPhotoPopup = new PopupWithForm({
  popupSelector: '#popup_add-photo',
  //submitFormHandler: ({place, imageUrl}) => section.addItem(createCard({ name: place, link: imageUrl }))
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



// console.log(userInfoPopup._getInputValues());

// api.setUserInfo(userInfoPopup._getInputValues())
//     .then((res) => {
//       userInfo.setUserInfo(res.name, res.about);
//     })

// const deletingPhotoConfirmPopap = new Popup('#popup_delete-photo');
// deletingPhotoConfirmPopap.setEventListeners();
// // confirmButton.addEventListener('click', () => {
// //   deletingPhotoConfirmPopap.
// // })


// const addedAvatarPopup = new PopupWithAvatar({
//   popupSelector: '#popup_add-avatar',
//   submitFormHandler: (value) => {
//     console.log('submitFormHandler от аватара');
//     profileAvatar.src = value;
//   }
// });

// profileAvatar.addEventListener('click', ()=> {
//   addedAvatarPopup.open({avatarUrl: ''});
// });
// addedAvatarPopup.setEventListeners();

// const viewedAddedAvatarPopup = new FormValidator (validationConfig, addedAvatarPopup);
// viewedAddedAvatarPopup.enableValidation();
// PopupWithForm
// PopupWithAvatar







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




// const cardData = {
//   items: initialCards, 
//   renderer: renderCard
// };
// const section = new Section (cardData, '.elements');
// section.renderAllPage(initialCards);