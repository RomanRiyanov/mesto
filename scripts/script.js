//переменные и константы
//окно редактирования имени профиля

const popupEditProfile = document.querySelector('#popup_eidt-profile');
const popupFormEditProfile = popupEditProfile.querySelector('#popup__form_edit-profile');
const popupEditProfileCloseButton = document.querySelector('#close-button_eidt-profile');
const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');

const popupList = Array.from(document.querySelectorAll('.popup'));

const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const nameInput = popupFormEditProfile.querySelector('.popup__input[name=user]');
const jobInput = popupFormEditProfile.querySelector('.popup__input[name=profession]');

//окно открытия просмотра фотографии

const imageViewPopup = document.querySelector('#popup_view-photo');
const imageViewCloseButton = document.querySelector('#close-button_view-photo');
const viewImage = document.querySelector('.popup__view-image');
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

function openImageView(event) {
  viewImage.src = event.target.src;
  viewImage.alt = event.target.alt;
  figcaption.textContent = event.target.alt;
  
  openPopup(imageViewPopup);
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

editButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;

  const buttonElement = popupEditProfile.querySelector('.submit-button');
  buttonElement.classList.add('inactive-button');
  buttonElement.setAttribute('disabled', true);
});

popupEditProfileCloseButton.addEventListener('click', () => {closePopup(popupEditProfile)});

popupFormEditProfile.addEventListener('submit', editProfile);





//обработчики закрытия просмотра фотографии

imageViewCloseButton.addEventListener('click', () => {closePopup(imageViewPopup)});

//обработчик закрытия попапа по клику на темном фоне

popupList.forEach((popup) => {
  popup.addEventListener('click', () => {closePopapByPressOnOverlay(popup)});
});