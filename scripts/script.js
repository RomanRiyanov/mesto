const initialCards = [
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

  //окно редактирования имени профиля

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let closeButton = document.querySelector('.close-button');
let editButton = document.querySelector('.edit-button');
let saveButton = document.querySelector('.save-button');
let addButton = document.querySelector('.add-button');


let profileName = document.querySelector('.profile__title');
let profileInfo = document.querySelector('.profile__subtitle');

let nameInput = popupForm.querySelector('.popup__input[name=user]');
let jobInput = popupForm.querySelector('.popup__input[name=profession]');


function popupIsViewable() {
    popup.classList.toggle('popup_viewable');

    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
}

function editName(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    popupIsViewable();
}

editButton.addEventListener('click', popupIsViewable);

closeButton.addEventListener('click', popupIsViewable);

popupForm.addEventListener('submit', editName);

//окно добавления новой карточки с фотографией

let addPhotoPopup = document.querySelector('#popup_add-photo');
let addPhotoPopupForm = document.querySelector('#popup__form_add-photo');
let addPhotoCloseButton = document.querySelector('#close-button_add-photo');

let placeInput = addPhotoPopupForm.querySelector('.popup__input[name=place]');
let urlInput = addPhotoPopupForm.querySelector('.popup__input[name=image-url]');

//обработчики событий

function addPhotoPopupIsViewable() {
    addPhotoPopup.classList.toggle('popup_viewable');

    placeInput.value = '';
    urlInput.value = '';
}

function addPhotoOnPage(event) {
  event.preventDefault();

  addNewElement({name: placeInput.value, link: urlInput.value});

  addPhotoPopupIsViewable();
}

addButton.addEventListener('click', addPhotoPopupIsViewable);

addPhotoCloseButton.addEventListener('click', addPhotoPopupIsViewable);

addPhotoPopupForm.addEventListener('submit', addPhotoOnPage);

//генерация карточки

let likeButtonHandler = function (event) {
  event.target.closest('.like-button').classList.toggle('like-button_active');
}

let deleteButtonHandler = function (event) {
  event.target.closest('.element').remove();
}

let elements = document.querySelector('.elements'); 
let elementTemplate = 
    document.querySelector('#element').
    content.querySelector('.element');

let createNewElement = (item) => {
    let element = elementTemplate.cloneNode(true);

    let elementPhoto = element.querySelector('.element__photo');
    elementPhoto.src = item.link;
    elementPhoto.addEventListener('click', imageViewOpen);

    let elementTitle = element.querySelector('.element__title');
    elementTitle.textContent = item.name;

    let likeButton = element.querySelector('.like-button');
    likeButton.addEventListener('click', likeButtonHandler);

    let deleteButton = element.querySelector('.delete-button');
    deleteButton.addEventListener('click', deleteButtonHandler);

    return element;
}

let addNewElement = (item) => {
    elements.append(createNewElement(item));
};

initialCards.forEach((item) => {
    addNewElement(item);
});

//окно открытия просмотра фотографии

let imageViewPopup = document.querySelector('#popup_view-photo');
let imageViewCloseButton = document.querySelector('#close-button_view-photo');

function imageViewPopupIsViewable() {
  imageViewPopup.classList.toggle('popup_viewable');
}

function imageViewOpen(event) {
  let viewImage = document.querySelector('.popup__view-image');
  let figcaption = document.querySelector('.popup__figcaption');

  viewImage.src = event.target.closest('.element__photo').src;
  figcaption.textContent = event.target.nextElementSibling.children[0].textContent;
  
  imageViewPopupIsViewable();
}

imageViewCloseButton.addEventListener('click', imageViewPopupIsViewable);
