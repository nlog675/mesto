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
import Api from "../components/Api.js"
import { API } from "../utils/constants.js";



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



const api = new Api(API);

let userId

api.getProfile()
  .then(user => {
    userInfo.setUserInfo(user)
    userId = user._id
  });

  api.getCard()
    .then(data => {
      cardsContainer.renderItems(data)
    })




const popupProfile = new popupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: inputValues => {
    api.editProfile(inputValues)
      .then(() => {
        userInfo.setUserInfo(inputValues)
        popupProfile.close()
      })
  }
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
  const userCard = new Card(data, '.template-item', handleCardClick, deleteCard, likeCard).render();

  return userCard;
}

function deleteCard(id) {
  return api.deleteCard(id)
}

function likeCard(id) {
  return api.likeCard(id)
}

// const popupCard = new PopupWithForm({
//   popupSelector: popupAdd,
//   handleFormSubmit: (formData) => {
//     const element = handleCreateCard(formData, '.template-item');
//     cardList.prepend(element);
//   }
// })

const popupCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (FormData) => {
    api.addCard(FormData)
    .then((res) => {
      const element = handleCreateCard(res);
      // cardList.addItem(element)
      cardList.prepend(element)
    })
    .catch(err => console.log(err))
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
  renderer: (item) => {
    cardsContainer.addItem(handleCreateCard(item))
  },
}, '.elements__list');
