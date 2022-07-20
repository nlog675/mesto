import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import popupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { initialCards } from "../utils/initialCards.js";

import { 
  popupEdit,
  popupAdd,
  profileName,
  profileAbout,
  popupEditSubmitButton,
  buttonEdit,
  buttonAdd,
  popupYourName,
  popupAboutYou,
  formElementAdd,
  cardList,
} from "../utils/constants.js";



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
});

editProfile.setEventListeners();

popupEditSubmitButton.addEventListener('submit', e => {
  e.preventDefault();
  userInfo.setUserInfo(profileName, profileAbout);
  userPopup.close();
});

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
formValidatorAdd.enableValidation();
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

