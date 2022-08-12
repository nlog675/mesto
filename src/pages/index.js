import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import popupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

import { 
  popupEdit,
  popupAdd,
  profileName,
  profileAbout,
  buttonEdit,
  buttonAdd,
  popupYourName,
  popupAboutYou,
  formElementAdd,
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

Promise.all([api.getProfile(), api.getCard()])
    .then(([user, data]) => {
      userId = user._id;
      userInfo.setUserInfo(user);
      userInfo.setNewAvatar(user);

      cardsContainer.renderItems(data.reverse());
    })
    .catch((err) => console.log(err))

const popupProfile = new popupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: inputValues => {
    popupProfile.renderLoading(true, 'Сохранение...')
    api.editProfile(inputValues)
      .then(() => {
        userInfo.setUserInfo(inputValues)
        popupProfile.close()
      })
      .catch((err) => console.log(err))
      .finally(() => popupProfile.renderLoading(false, 'Сохранить'))
  }
});

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: popupUserAvatar,
  handleFormSubmit: data => {
    popupAvatar.renderLoading(true, 'Сохранение...')
    api.changeAvatar(data.link)
      .then((data) => {
        userInfo.setNewAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.renderLoading(false, 'Сохранить'))
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
  const userCard = new Card(data, '.template-item', handleCardClick, {handleDeleteCard}, handlePutLike, handleDeleteLike, userId).render();

  return userCard;
}

const popupDelete = new PopupWithConfirmation(popupDeleteCard);

popupDelete.setEventListeners();

function handleDeleteCard(cardId) {
  popupDelete.open();
  // console.log(cardId);
  popupDelete.setConfirmHandler(() => {
    popupDelete.renderLoading(true, 'Удаление...')
    api.deleteCard(cardId)
      .then(() => {
        this.deleteCard()
        popupDelete.close()
      })
      .catch((err)  => console.log(err))
      .finally(() => popupDelete.renderLoading(false, 'Да'))
  })
}

function handlePutLike(card) {
  api.likeCard(card._cardId)
    .then((res) => {
      // console.log(res);
      card.putLike();
      card.countLikes(res.likes);
    })
    .catch((err) => console.log(err))
}

function handleDeleteLike(card) {
  api.dislikeCard(card._cardId)
    .then((res) => {
      card.deleteLike()
      card.countLikes(res.likes)
    })
    .catch((err) => console.log(err))
}

const popupCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (FormData) => {
    popupCard.renderLoading(true, 'Создание...');
    api.addCard(FormData)
    .then((res) => {
        cardsContainer.addItem(handleCreateCard(res));
        popupCard.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupCard.renderLoading(false, 'Создать')
    })
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
