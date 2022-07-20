import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = popupSelector.querySelector('.popup__image');
    this._name = popupSelector.querySelector('.popup__caption');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}