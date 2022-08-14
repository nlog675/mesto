export const buttonEdit = document.querySelector('.profile__edit-button');
export const popupEdit = document.querySelector('.popup-edit');
export const popupYourName = document.querySelector('.popup__input-name');
export const popupAboutYou = document.querySelector('.popup__input-about');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__description');
export const buttonAdd = document.querySelector('.profile__add-button');
export const popupAdd = document.querySelector('.popup-add');
export const formElementAdd = document.querySelector('.popup__form-add-card');
export const popupPicture = document.querySelector('.popup-picture');
export const popupDeleteCard = document.querySelector('.popup-delete');
export const popupUserAvatar = document.querySelector('.popup-avatar');
export const avatarChangeButton = document.querySelector('.profile__button-change-avatar');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formElementAvatar = document.querySelector('.popup__form-add-avatar');

export const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export const loadingTextConfig = ({
  loadingTextSave: 'Сохранение...',
  loadingTextCreate: 'Создание...',
  loadingTextDelete: 'Удаление...',
  loadingSaveDefault: 'Сохранить',
  loadingCreateDefault: 'Создать',
  loadingDeleteDefault: 'Да'
});

export const apiConfig = ({
  headers: {
    authorization: '3797bd0f-31da-43b0-b12c-2d59c89b7ac4',
    'Content-Type': 'application/json'
  },
  url: 'https://nomoreparties.co/v1/cohort-47'
}); 

export const selectorConfig = ({
  cardSelector: '.template-item',
  containerSelector: '.elements__list'
})
