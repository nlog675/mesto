import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDeleteButton = document.querySelector('.popup__card-del-btn');
  }

  setConfirmHandler(handler) {
    this._confirmHandler = handler;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', e => {
      e.preventDefault();
      this._confirmHandler()
    })
    
    super.setEventListeners();
  }
}