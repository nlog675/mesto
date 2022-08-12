export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonSubmit = this._popupSelector.querySelector('.popup__button');
  };

  open() {
    this._popupSelector.classList.add('popup_isOpen');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popupSelector.classList.remove('popup_isOpen');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  };

  renderLoading(isLoading, text){
    if (isLoading) {
      this._buttonSubmit.textContent = text
    } else {
      this._buttonSubmit.textContent = text
    }
  };

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', e => {
      if (e.target.classList.contains('popup__close') || e.target === e.currentTarget) {
        this.close();
      }
    });
  }
};