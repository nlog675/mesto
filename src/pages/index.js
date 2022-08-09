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
  popupPicture,
  popupDeleteCard,
  popupUserAvatar,
  avatarChangeButton,
  profileAvatar,
  formElementAvatar
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { data } from "autoprefixer";
import Api from "../components/Api.js"
import { API } from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";



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

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);


const api = new Api(API);

let userId

api.getProfile()
  .then(user => {
    userInfo.setUserInfo(user);
    userInfo.setNewAvatar(user);
    userId = user._id;
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
      .catch((err) => console.log(err))
  }
});

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: popupUserAvatar,
  handleFormSubmit: data => {
    api.changeAvatar(data.link)
      .then((data) => {
        userInfo.setNewAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
  }
})

popupAvatar.setEventListeners()

avatarChangeButton.addEventListener('click', () => {
  formElementAvatar.reset();
  formValidatorAvatar.resetValidation()
  popupAvatar.open()
})

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
  const userCard = new Card(data, '.template-item', handleCardClick, {handleDeleteCard}, handleLikeCard, userId).render();

  return userCard;
}

const popupDelete = new PopupWithConfirmation(popupDeleteCard);

popupDelete.setEventListeners();

function handleDeleteCard(cardId) {
  popupDelete.open();
  // console.log(cardId);
  popupDelete.setConfirmHandler(() => {
    api.deleteCard(cardId)
      .then(() => {
        this.deleteCard()
      })
      .catch((err)  => console.log(err))
  })
}

function handleLikeCard(cardId) {
  return api.likeCard(cardId)
}

// function likeCard(id) {
//   return api.likeCard(id)
// }

const popupCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (FormData) => {
    api.addCard(FormData)
    .then((res) => {
      const element = handleCreateCard(res);
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
const formValidatorAvatar = new FormValidator(validationSettings, popupUserAvatar);
formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAvatar.enableValidation();



const cardsContainer = new Section ({ 
  renderer: (item) => {
    cardsContainer.addItem(handleCreateCard(item))
  },
}, '.elements__list');
