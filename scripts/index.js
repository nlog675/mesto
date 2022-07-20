import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import popupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


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
  export const popupYourName = document.querySelector('.popup__input-name');
  export const popupAboutYou = document.querySelector('.popup__input-about');
  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__description');
  const formElement = document.querySelector('.popup__form');
  const buttonAdd = document.querySelector('.profile__add-button');
  const popupAdd = document.querySelector('.popup-add');
  const popupPlaceName = document.querySelector('.popup__input-place-name');
  const popupPlaceLink = document.querySelector('.popup__input-place-link');
  const cardList = document.querySelector('.elements__list');
  const formElementAdd = document.querySelector('.popup__form-add-card');
  
  const popupImageSrc = document.querySelector('.popup__image');
  const popupImageName = document.querySelector('.popup__caption');
  const popups = document.querySelectorAll('.popup');
  const popupEditSubmitButton = document.querySelector('.popup__profile-edit-btn')


const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const userPopup = new Popup(popupEdit);
userPopup.setEventListeners();

const cardPopup = new Popup(popupAdd);
cardPopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileAbout);

const editProfile = new popupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: data => userInfo.setUserInfo(data)
})

editProfile.setEventListeners();

popupEditSubmitButton.addEventListener('submit', e => {
  e.preventDefault();
  userInfo.setUserInfo(profileName, profileAbout);
  userPopup.close();
})

buttonEdit.addEventListener('click', () => {
  const getInputValues = userInfo.getUserInfo();
  popupYourName.value = getInputValues.inputName;
  popupAboutYou.value = getInputValues.inputAbout;
  formValidatorEdit.resetValidation()
  userPopup.open();
});

const createCard = new popupWithForm({
  popupSelector: popupAdd, 
  handleFormSubmit: (formData) => {
    const userCard = new Card(formData, '.template-item');
    const element = userCard.render();

    cardList.prepend(element);
  }
});

createCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  formValidatorAdd.resetValidation();
  cardPopup.open();
});

const formValidatorAdd = new FormValidator(validationSettings, popupAdd);
const formValidatorEdit = new FormValidator(validationSettings, popupEdit);
formValidatorAdd.enableValidation()
formValidatorEdit.enableValidation();



const prerenderedCards = new Section ({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, '.template-item');
    const cardEl = card.render();
    prerenderedCards.addItem(cardEl)
  },
}, '.elements__list');


prerenderedCards.renderItems();

