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
const formElementAdd = document.querySelector('.popup__form-add-card');
const cardElement = cardTemplate.querySelector('.elements__item');
const popupPicture = document.querySelector('.popup-picture');
const popupImageSrc = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__caption');



//открытие и закрытие попапов
function openPopup(popup) {
    popup.classList.add('popup_isOpen');
    popup.classList.remove('popup_isClosed');
};

function closePopup(popup) {
    popup.classList.remove('popup_isOpen');
    popup.classList.add('popup_isClosed');
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

//лайк карточки
const likeCard = e => e.currentTarget.classList.toggle('elements__card-like_active');

//удаление карточки
const deleteCard = e => e.target.closest('.elements__item').remove();

//создание карточек
const createCard = item => {
  const cardElement = cardTemplate
  .querySelector('.elements__item')
  .cloneNode(true);
  const cardLikeBtn = cardElement.querySelector('.elements__card-like');
  const deleteBtn = cardElement.querySelector('.elements__card-delete');
  const popupPicBtn = cardElement.querySelector('.elements__item-image');
  const popupClosePicBtn = document.querySelector('.popup__close-pic');

  getCardElementImage(cardElement).src = item.link;
  getCardElementName(cardElement).textContent = item.name;
  
  cardLikeBtn.addEventListener('click', likeCard);
  deleteBtn.addEventListener('click', deleteCard);
  
  popupPicBtn.addEventListener('click', () => {
    openPopup(popupPicture);
    popupImageSrc.src = item.link;
    popupImageName.textContent = item.name;
  });

  popupClosePicBtn.addEventListener('click', () => {
    closePopup(popupPicture);
  });

  
  return cardElement;
};

//добавление карточек
const addCard = item => {
  const cardElement = createCard(item);

  cardList.append(cardElement);
};

//цикл массива с пререндерными карточками
initialCards.forEach(addCard);

//добавление пользовательской карточки
const createUsersCard = e => {
  e.preventDefault()
  const usersCard = createCard({name: popupPlaceName.value, link: popupPlaceLink.value});
  cardList.prepend(usersCard);
  closePopup(popupAdd);
};

formElementAdd.addEventListener('submit', createUsersCard);