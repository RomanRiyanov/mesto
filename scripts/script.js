//переменные и константы
//окно редактирования имени профиля

const popupEditProfile = document.querySelector('#popup_eidt-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const closeButton = document.querySelector('#close-button_eidt-profile');
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

//окно добавления новой карточки с фотографией

const addPhotoPopup = document.querySelector('#popup_add-photo');
const addPhotoPopupForm = document.querySelector('#popup__form_add-photo');
const addPhotoCloseButton = document.querySelector('#close-button_add-photo');

const placeInput = addPhotoPopupForm.querySelector('.popup__input[name=place]');
const urlInput = addPhotoPopupForm.querySelector('.popup__input[name=image-url]');

//элементы новой карточки

const cardsContainer = document.querySelector('.elements'); 
const elementTemplate = 
    document.querySelector('#element').
    content.querySelector('.element');

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

//функции добавления новой карточки с фотографией

function addPhotoOnPage(event) {
  event.preventDefault();

  addNewElementOnStart({name: placeInput.value, link: urlInput.value});

  closePopup(addPhotoPopup);
}

//функции генерации новой карточки

const createNewElement = (item) => {
  const element = elementTemplate.cloneNode(true);

  const elementPhoto = element.querySelector('.element__photo');
  elementPhoto.src = item.link;
  elementPhoto.addEventListener('click', openImageView);

  const elementTitle = element.querySelector('.element__title');
  elementTitle.textContent = item.name;

  elementPhoto.alt = elementTitle.textContent;

  const likeButton = element.querySelector('.like-button');
  likeButton.addEventListener('click', likeButtonHandler);

  const deleteButton = element.querySelector('.delete-button');
  deleteButton.addEventListener('click', deleteButtonHandler);

  return element;
}

const likeButtonHandler = function (event) {
event.target.classList.toggle('like-button_active');
}

const deleteButtonHandler = function (event) {
event.target.closest('.element').remove();
}

const addNewElementOnStart = (item) => {
cardsContainer.prepend(createNewElement(item));
};

const addNewElement = (item) => {
  cardsContainer.append(createNewElement(item));
};

initialCards.forEach((item) => {
  addNewElement(item);
});

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
  const openedPopup = document.querySelector('.popup_viewable');

  if (event.key === 'Escape') {
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

closeButton.addEventListener('click', () => {closePopup(popupEditProfile)});

popupFormEditProfile.addEventListener('submit', editProfile);

//обработчики добавления новой карточки с фотографией

addButton.addEventListener('click', () => {
  openPopup(addPhotoPopup);
  addPhotoPopupForm.reset();

  const buttonElement = addPhotoPopup.querySelector('.submit-button');
  buttonElement.classList.add('inactive-button');
  buttonElement.setAttribute('disabled', true);
});

addPhotoCloseButton.addEventListener('click', () => {closePopup(addPhotoPopup)});

addPhotoPopupForm.addEventListener('submit', addPhotoOnPage);

//обработчики открытия просмотра фотографии

imageViewCloseButton.addEventListener('click', () => {closePopup(imageViewPopup)});

//обработчик закрытия попапа по клику на темном фоне

popupList.forEach((popup) => {
  popup.addEventListener('click', () => {closePopapByPressOnOverlay(popup)});
});