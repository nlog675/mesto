import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import popupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
  popupPicture
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";



const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

const userInfo = new UserInfo(profileName, profileAbout);

const popupProfile = new popupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: data => userInfo.setUserInfo(data)
});

popupProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  const getInputValues = userInfo.getUserInfo();
  popupYourName.value = getInputValues.inputName;
  popupAboutYou.value = getInputValues.inputAbout;
  formValidatorEdit.resetValidation()
  popupProfile.open();
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const createCard = ({name, link}, cardSelector, handleCardClick) => {
  const userCard = new Card({name, link}, cardSelector, handleCardClick);
  const element = userCard.render();
  return element;
}



const popupCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (formData) => {
    const element = createCard(formData, '.template-item', handleCardClick);
    cardList.prepend(element);
  }
})

// const popupCard = new popupWithForm({
//   popupSelector: popupAdd, 
//   handleFormSubmit: (formData) => {
//     const userCard = new Card(formData, '.template-item');
//     const element = userCard.render();

//     cardList.prepend(element);
//   }
// });

popupCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  formValidatorAdd.resetValidation();
  popupCard.open();
});

const formValidatorAdd = new FormValidator(validationSettings, popupAdd);
const formValidatorEdit = new FormValidator(validationSettings, popupEdit);
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();



const cardsContainer = new Section ({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, '.template-item');
    const cardEl = card.render();
    cardsContainer.addItem(cardEl)
  },
}, '.elements__list');


cardsContainer.renderItems();