const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupEditCloseButton = document.querySelector('.popup__close-edit');
const popupYourName = document.querySelector('.popup__input-name');
const popupAboutYou = document.querySelector('.popup__input-about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupPlaceName = document.querySelector('.popup__input-place-name');
const popupPlaceLink = document.querySelector('.popup__input-place-link');
const popupAddCloseButton = document.querySelector('.popup__close-add');


function openPopup(popup) {
    popup.classList.add('popup_isOpen');
};

function closePopup(popup) {
    popup.classList.remove('popup_isOpen');
};

function profileInputs() {
    popupYourName.value = profileName.textContent;
    popupAboutYou.value = profileAbout.textContent;
};

function formSubmit(event) {
    event.preventDefault();
    profileName.textContent = popupYourName.value;
    profileAbout.textContent = popupAboutYou.value;
    closePopup(popup);
};

function placeInputs() {
    popupPlaceName.value = popupPlaceName.textContent;
    popupPlaceLink.value = popupPlaceLink.textContent;
};

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    profileInputs();
});

popupEditCloseButton.addEventListener('click', () => {
    closePopup(popupEdit);
});

popupAddCloseButton.addEventListener('click', () => {
    closePopup(popupAdd);
});

formElement.addEventListener('submit', formSubmit);

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    placeInputs();
});



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



initialCards.forEach((item) => {
    const cardTemplate = document.querySelector('#card').content;
    const elementItem = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const list = document.querySelector('.elements__list');

    elementItem.querySelector('.elements__item-image').src = item.link;
    elementItem.querySelector('.elements__card-heading').textContent = item.name;
    list.append(elementItem);
})