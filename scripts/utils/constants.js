//внешние данные

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'inactive-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

   //окно добавления новой карточки с фотографией

   export const popupAddPhoto = document.querySelector('#popup_add-photo');
   export const popupAddPhotoForm = document.querySelector('#popup__form_add-photo');
   export const photoAddCloseButton = document.querySelector('#close-button_add-photo');

   export const placeInput = document.querySelector('.popup__input[name=place]');
   export const urlInput = document.querySelector('.popup__input[name=image-url]');

   //окно редактирования имени профиля

   export const popupEditProfile = document.querySelector('#popup_edit-profile');
   export const popupFormEditProfile = popupEditProfile.querySelector('#popup__form_edit-profile');
   export const popupEditProfileCloseButton = document.querySelector('#close-button_edit-profile');
   export const buttonEditProfile = document.querySelector('.edit-button');
   export const buttonAddPhoto = document.querySelector('.add-button');
  
   export const popupList = Array.from(document.querySelectorAll('.popup'));

   export const profileName = document.querySelector('.profile__title');
   export const profileInfo = document.querySelector('.profile__subtitle');

   export const nameInput = popupFormEditProfile.querySelector('.popup__input[name=user]');
   export const jobInput = popupFormEditProfile.querySelector('.popup__input[name=profession]');
  
   //окно открытия просмотра фотографии

   export const imageViewPopup = document.querySelector('#popup_view-photo');
   export const imageViewCloseButton = document.querySelector('#close-button_view-photo');
   export const imageViewWindow = document.querySelector('.popup__view-image');
   export const figcaption = document.querySelector('.popup__figcaption');