export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  };

  open() {
    this._popupSelector.classList.add('popup_isOpen');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  close() {
    this._popupSelector.classList.remove('popup_isOpen');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  };

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
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