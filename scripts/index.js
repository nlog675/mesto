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

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupEditCloseButton = document.querySelector('.popup__close-edit');
const popupYourName = document.querySelector('.popup__input-name');
const popupAboutYou = document.querySelector('.popup__input-about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form-edit-profile');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupPlaceName = document.querySelector('.popup__input-place-name');
const popupPlaceLink = document.querySelector('.popup__input-place-link');
const popupAddCloseButton = document.querySelector('.popup__close-add');
const cardTemplate = document.querySelector('#card').content;

const cardList = document.querySelector('.elements__list');


//открытие и закрытие попапов
function openPopup(popup) {
    popup.classList.add('popup_isOpen');
};

function closePopup(popup) {
    popup.classList.remove('popup_isOpen');
};

//заполнение полей профиля
function profileInputs() {
    popupYourName.value = profileName.textContent;
    popupAboutYou.value = profileAbout.textContent;
};

//заполнение полей добавления картинки
function placeInputs() {
  popupPlaceName.value = popupPlaceName.textContent;
  popupPlaceLink.value = popupPlaceLink.textContent;
};

//сабмит формы профиля
function formSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupYourName.value;
  profileAbout.textContent = popupAboutYou.value;
  closePopup(popup);
};

//обработчики событий
formElement.addEventListener('submit', formSubmit);

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

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    placeInputs();
});

//рефакторинг длинной функции создания карточек
const getCardElementImage = cardElement => cardElement.querySelector('.elements__item-image');
const getCardElementName = cardElement => cardElement.querySelector('.elements__card-heading');
const getCardElementAlt = cardElement => cardElement.querySelector('.elements__card-heading');

//создание карточек
const createCard = item => {
  const cardElement = cardTemplate
  .querySelector('.elements__item')
  .cloneNode(true);

  getCardElementImage(cardElement).src = item.link;
  getCardElementName(cardElement).textContent = item.name;
  getCardElementAlt(cardElement).alt = item.name;
  
  return cardElement;
};

//добавление карточек
const addCard = item => {
  const cardElement = createCard(item);

  cardList.append(cardElement);
};

//цикл массива с пререндерными карточками
initialCards.forEach(addCard);