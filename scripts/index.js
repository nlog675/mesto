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
const popupYourName = document.querySelector('.popup__input-name');
const popupAboutYou = document.querySelector('.popup__input-about');
//const popupInputList = Array.from(document.querySelectorAll('.popup__input'));
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form-edit-profile');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupPlaceName = document.querySelector('.popup__input-place-name');
const popupPlaceLink = document.querySelector('.popup__input-place-link');
const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.elements__list');
const formElementAdd = document.querySelector('.popup__form-add-card');
const cardElement = cardTemplate.querySelector('.elements__item');
const popupPicture = document.querySelector('.popup-picture');
const popupImageSrc = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');


//открытие и закрытие попапов
const openPopup = (popup) => {
    popup.classList.add('popup_isOpen');
    popup.classList.remove('popup_isClosed');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_isOpen');
    popup.classList.add('popup_isClosed');
}

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

// const submitButton = document.querySelector('.popup__button');
// const isInputValid = inputEl => {
//   return inputEl.checkValidity();
// };
// const showErrorMessage = (errorEl, message) => {
//   errorEl.classList.add('popup__input_type_error');
//   errorEl.textContent = message;
// };

// const hideErrorMessage = errorEl => {
//   errorEl.target.classList.remove('popup__input_type_error');
//   errorEl.textContent = '';
// }

// submitButton.addEventListener('click', () => {
//   let isFormValid = true;
//   popupInputList.forEach((inputEl) => {
//     const errorEl = document.querySelector(`#error-${inputEl.id}`);
//     if (!isInputValid(inputEl)) {
//       isFormValid = false;
//       showErrorMessage(errorEl, inputEl.validationMessage);
//     } else {
//       hideErrorMessage(errorEl);
//     }
//   });
//   console.log(isFormValid);
// });

const formInput = document.querySelector('.popup__input');
const formError = formElement.querySelector(`#error-${formInput.id}`);
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
};

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList,buttonElement);
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', e => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  })
};

enableValidation();

formElement.addEventListener('submit', function(e) {
  e.preventDefault();
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input_type_error');
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};





//обработчики событий
formElement.addEventListener('submit', submitForm);

editButton.addEventListener('click', () => {
    openPopup(popupEdit);
    getProfileInputs();
});

addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    formElementAdd.reset();
});

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
  const cardElementName = cardElement.querySelector('.elements__card-heading');

  popupPicBtn.src = item.link;
  cardElementName.textContent = item.name;
  popupPicBtn.alt = item.name; 
  
  cardLikeBtn.addEventListener('click', likeCard);
  deleteBtn.addEventListener('click', deleteCard);
  
  popupPicBtn.addEventListener('click', () => {
    openPopup(popupPicture);
    popupImageSrc.src = item.link;
    popupImageName.textContent = item.name;
    popupImageSrc.alt = item.name;
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

//обработчик события закрытия любого попапа
popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});