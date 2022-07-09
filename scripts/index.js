import Card from "./Card.js";
import FormValidator from "./FormValidator.js"

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
  
  const buttonEdit = document.querySelector('.profile__edit-button');
  const popup = document.querySelector('.popup');
  const popupEdit = document.querySelector('.popup-edit');
  const popupYourName = document.querySelector('.popup__input-name');
  const popupAboutYou = document.querySelector('.popup__input-about');
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__description');
  const formElement = document.querySelector('.popup__form');
  const buttonAdd = document.querySelector('.profile__add-button');
  const popupAdd = document.querySelector('.popup-add');
  const popupPlaceName = document.querySelector('.popup__input-place-name');
  const popupPlaceLink = document.querySelector('.popup__input-place-link');
  const cardList = document.querySelector('.elements__list');
  const formElementAdd = document.querySelector('.popup__form-add-card');
  const popupPicture = document.querySelector('.popup-picture');
  const popupImageSrc = document.querySelector('.popup__image');
  const popupImageName = document.querySelector('.popup__caption');
  const popups = document.querySelectorAll('.popup');


  const validationSettings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  
  const zoomPic = (link, name) => {
    popupImageSrc.src = link;
    popupImageName.textContent = name;
    popupImageSrc.alt = name;
    openPopup(popupPicture);
};

const createCard = (item) => {
    const card = new Card(item, '.template-item', zoomPic);
    const cardEl = card.render();
    
    return cardEl;
};

const addCard = (cardList, card) => {
    cardList.append(card);
};

initialCards.forEach((element) => {
    const newCard = createCard(element);
    addCard(cardList, newCard);
});

//открытие и закрытие попапов
const openPopup = (popup) => {
    popup.classList.add('popup_isOpen');
    document.addEventListener('keydown', keyEscHandler);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_isOpen');
    document.removeEventListener('keydown', keyEscHandler);
};

//заполнение полей профиля
function getProfileInputs() {
    popupYourName.value = profileName.textContent;
    popupAboutYou.value = profileAbout.textContent;
};

//заполнение полей добавления картинки
function getPlaceInputs() {
    popupPlaceName.value = popupPlaceName.textContent;
    popupPlaceLink.value = popupPlaceLink.textContent;
  };

  //сабмит формы профиля
function submitForm(e) {
    e.preventDefault();
    profileName.textContent = popupYourName.value;
    profileAbout.textContent = popupAboutYou.value;
    closePopup(popup);
  };

  //обработчики событий
formElement.addEventListener('submit', submitForm);

buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
    getProfileInputs();
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
    formElementAdd.reset();
    formValidatorAdd.resetValidation();
});

//добавление пользовательской карточки
const createUsersCard = e => {
    e.preventDefault()
    const usersCard = createCard({name: popupPlaceName.value, link: popupPlaceLink.value});
    cardList.prepend(usersCard);
    closePopup(popupAdd);
  };

  formElementAdd.addEventListener('submit', createUsersCard);

  //обработчик события закрытия любого попапа
popups.forEach((popup) => {
    popup.addEventListener('click', e => {
      if (e.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });

  // функция, закрывающая попап клавишей escape

const keyEscHandler = e => {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_isOpen');
      closePopup(openedPopup);
    };
  };
  
  // обработчик, закрывающий попап кликом на оверлей
  
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', e => {
      if (e.target === e.currentTarget) {
        closePopup(popup);
      }
    });
  });

  const formValidatorAdd = new FormValidator(validationSettings, popupAdd);
  const formValidatorEdit = new FormValidator(validationSettings, popupEdit);
  formValidatorAdd.enableValidation()
  formValidatorEdit.enableValidation();