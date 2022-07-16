class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this.popupSelector.classList.add('popup_isOpen');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popupSelector.classList.remove('popup_isOpen');
    document.addEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.target === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', e => {
      if (e.target.contains.classList('popup_isOpen')) {
        this.close()
      }
    })
  }
}