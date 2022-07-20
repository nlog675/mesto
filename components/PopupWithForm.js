import Popup from "../components/Popup.js";

export default class popupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  };

  setEventListeners() {
    this._popupSelector.addEventListener('submit', e => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

    this._popupSelector.addEventListener('click', e => {
      if (e.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  };

  close() {
    this._popupSelector.classList.remove('popup_isOpen');
    this._popupSelector.querySelector('.popup__form').reset();
    document.removeEventListener('keydown', this._handleEscClose);
  };
};