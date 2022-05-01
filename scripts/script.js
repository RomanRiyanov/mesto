//окно редактирования имени профиля

const popup = document.querySelector('.popup');
const popupFormEditProfile = popup.querySelector('.popup__form');
const closeButton = document.querySelector('.close-button');
const editButton = document.querySelector('.edit-button');
const saveButton = document.querySelector('.save-button');
const addButton = document.querySelector('.add-button');

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

//обработчики редактирования имени профиля

function openPopup(popup) {
  popup.classList.add('popup_viewable');
}

function closePopup(popup) {
  popup.classList.remove('popup_viewable');
}

function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function resetFormPopupAddPhoto() {
  addPhotoPopupForm.reset();
}

function editProfile(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    closePopup(popup);
}

editButton.addEventListener('click', () => {openPopup(popup)});
editButton.addEventListener('click', openPopupEditProfile);

closeButton.addEventListener('click', () => {closePopup(popup)});

popupFormEditProfile.addEventListener('submit', editProfile);

//обработчики добавления новой карточки с фотографией

function addPhotoOnPage(event) {
  event.preventDefault();

  addNewElementOnStart({name: placeInput.value, link: urlInput.value});

  closePopup(addPhotoPopup);
}

addButton.addEventListener('click', () => {openPopup(addPhotoPopup)});
addButton.addEventListener('click', resetFormPopupAddPhoto);

addPhotoCloseButton.addEventListener('click', () => {closePopup(addPhotoPopup)});

addPhotoPopupForm.addEventListener('submit', addPhotoOnPage);

//генерация карточки

const createNewElement = (item) => {
    const element = elementTemplate.cloneNode(true);

    const elementPhoto = element.querySelector('.element__photo');
    elementPhoto.src = item.link;
    elementPhoto.addEventListener('click', OpenImageView);

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

//обработчики открытия просмотра фотографии

function OpenImageView(event) {
  
  viewImage.src = event.target.closest('.element__photo').src;
  figcaption.textContent = event.target.nextElementSibling.children[0].textContent;
  
  openPopup(imageViewPopup);
}

imageViewCloseButton.addEventListener('click', () => {closePopup(imageViewPopup)});