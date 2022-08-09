class FormValidator{
    constructor(validationSettings, formElement) {
        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    };

// функция, проверяющая валидность полей

_isValid(inputElement) {
    if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
    } else {
    this._hideInputError(inputElement);
    }
};

// функция, показывающая ошибку ввода

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

// функция, скрывающая ошибку ввода

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

// переключение активности кнопки Submit

_toggleButtonState() {
    if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
    } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
    }
};

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      };

// универсальная функция добавления обработчика всем полям формы

    _setEventListeners() {      
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState();
        });
        });
    };

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    enableValidation(formElement, validationSettings) {
        this._setEventListeners(formElement, validationSettings)
    }
};


export default FormValidator;