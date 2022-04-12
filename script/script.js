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
}

function popupOverlayClosability(e) {
    if (e.target === e.currentTarget) {
        popupIsViewable();
    }
}

function editName(event) {
    event.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
}

editButton.addEventListener('click', popupIsViewable);

closeButton.addEventListener('click', popupIsViewable);

popup.addEventListener('click', popupOverlayClosability);

popupForm.addEventListener('submit', editName);
saveButton.addEventListener('click', popupIsViewable);
