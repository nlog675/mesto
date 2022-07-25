import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__image');
    this._name = this._popupSelector.querySelector('.popup__caption');
  };

  open(name, link) {
    super.open();
    this._image.src = link;
    this._name.textContent = name;
    this._image.alt = name;
    
  }
};