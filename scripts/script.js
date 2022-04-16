let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let closeButton = document.querySelector('.close-button');
let editButton = document.querySelector('.edit-button');
let saveButton = document.querySelector('.save-button');

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

