import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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
import { data } from "autoprefixer";



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
  popupWithImage.open(name, link)
}

function handleCreateCard(data) {
  const userCard = new Card(data, '.template-item', handleCardClick).render();

  return userCard;
}

const popupCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (formData) => {
    const element = handleCreateCard(formData, '.template-item');
    cardList.prepend(element);
  }
})

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
    const cardEl = handleCreateCard(item);
    cardsContainer.addItem(cardEl)
  },
}, '.elements__list');

cardsContainer.renderItems();







// fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards', {
//   headers: {
//     authorization: '3797bd0f-31da-43b0-b12c-2d59c89b7ac4'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 


function getProfile() {
  fetch ('https://nomoreparties.co/v1/cohort-47/users/me', {
    method: 'GET',
    headers: {
      authorization: '3797bd0f-31da-43b0-b12c-2d59c89b7ac4'
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
}