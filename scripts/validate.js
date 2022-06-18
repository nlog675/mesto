const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const formInput = document.querySelector(validationSettings.inputSelector);
const formError = formElement.querySelector(`.${formInput.id}-error`);

// найти невалидный input

const hasInvalidInput = inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// переключение активности кнопки Submit

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// универсальная функция добавления обработчика всем полям формы

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList,buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList,buttonElement);
    });
  });
};

// функция перебора всех полей на странице

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', e => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// отмена стандартного поведения кнопки

formElement.addEventListener('submit', function(e) {
  e.preventDefault();
});

// функция, показывающая ошибку ввода

const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);
};

// функция, скрывающая ошибку ввода

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

// функция, проверяющая валидность полей

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// функция, закрывающая попап клавишей escape


const keyEscHandler = e => {
  popups.forEach((popup) => {
  if (e.key === 'Escape') {
    closePopup(popup)
  }
});
};

// обработчик, закрывающий попап кликом на оверлей

popups.forEach((popup) => {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
});

enableValidation(validationSettings);