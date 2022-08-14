import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import popupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

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

import { data } from "autoprefixer";
import { validationSettings } from "../utils/constants.js";
import { loadingTextConfig } from "../utils/constants.js";
import { apiConfig } from "../utils/constants.js";
import { selectorConfig } from "../utils/constants.js";



const popupWithImage = new PopupWithImage(popupPicture);

popupWithImage.setEventListeners();

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

const api = new Api(apiConfig);

const popupProfile = new popupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: inputValues => {
    popupProfile.renderLoading(true, loadingTextConfig.loadingTextSave)
    api.editProfile(inputValues)
      .then(() => {
        userInfo.setUserInfo(inputValues);
        popupProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupProfile.renderLoading(false, loadingTextConfig.loadingSaveDefault))
  }
});

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: popupUserAvatar,
  handleFormSubmit: data => {
    popupAvatar.renderLoading(true, loadingTextConfig.loadingTextSave)
    api.changeAvatar(data.link)
      .then((data) => {
        userInfo.setNewAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.renderLoading(false, loadingTextConfig.loadingSaveDefault))
  }
});

popupAvatar.setEventListeners();

const popupDelete = new PopupWithConfirmation(popupDeleteCard);

popupDelete.setEventListeners();

const popupCard = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (FormData) => {
    popupCard.renderLoading(true, loadingTextConfig.loadingTextCreate);
    api.addCard(FormData)
    .then((res) => {
        cardsContainer.addItem(handleCreateCard(res));
        popupCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupCard.renderLoading(false, loadingTextConfig.loadingCreateDefault)
    })
  }
});

popupCard.setEventListeners();

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
}, selectorConfig.containerSelector);


let userId;

Promise.all([api.getProfile(), api.getCard()])
    .then(([user, data]) => {
      userId = user._id;
      userInfo.setUserInfo(user);
      userInfo.setNewAvatar(user);

      cardsContainer.renderItems(data.reverse());
    })
    .catch((err) => console.log(err));


    function handleCardClick(name, link) {
      popupWithImage.open(name, link)
    };

    function handleCreateCard(data) {
      const userCard = new Card(data, selectorConfig.cardSelector, handleCardClick, {handleDeleteCard}, handlePutLike, handleDeleteLike, userId).render();
    
      return userCard;
    };

    function handleDeleteCard(cardId) {
      popupDelete.open();
      popupDelete.setConfirmHandler(() => {
        popupDelete.renderLoading(true, loadingTextConfig.loadingTextDelete)
        api.deleteCard(cardId)
          .then(() => {
            this.deleteCard();
            popupDelete.close();
          })
          .catch((err)  => console.log(err))
          .finally(() => popupDelete.renderLoading(false, loadingTextConfig.loadingDeleteDefault))
      })
    };

    function handlePutLike(card) {
      api.likeCard(card._cardId)
        .then((res) => {
          card.putLike();
          card.countLikes(res.likes);
        })
        .catch((err) => console.log(err))
    };

    function handleDeleteLike(card) {
      api.dislikeCard(card._cardId)
        .then((res) => {
          card.deleteLike();
          card.countLikes(res.likes);
        })
        .catch((err) => console.log(err))
    };


    avatarChangeButton.addEventListener('click', () => {
      formElementAvatar.reset();
      formValidatorAvatar.resetValidation()
      popupAvatar.open()
    });

    buttonEdit.addEventListener('click', () => {
      const getInputValues = userInfo.getUserInfo();
      popupYourName.value = getInputValues.inputName;
      popupAboutYou.value = getInputValues.inputAbout;
      formValidatorEdit.resetValidation()
      popupProfile.open();
    });

    buttonAdd.addEventListener('click', () => {
      formElementAdd.reset();
      formValidatorAdd.resetValidation();
      popupCard.open();
    });