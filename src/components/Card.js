import { data } from "autoprefixer";
import { popupPicture } from "../utils/constants";
import PopupWithImage from "./PopupWithImage";
import {popupWithImage} from "../pages/index.js"

export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const cardEl = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elements__item')
        .cloneNode(true);

        return cardEl;
    };

    _addEventListeners() {
        this._element.querySelector('.elements__card-delete')
        .addEventListener('click', () => this._deleteCard());

        this._cardLikeButton = this._element.querySelector('.elements__card-like');

        this._cardLikeButton.addEventListener('click', () => this._likeCard());

        this._itemImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    };

    _deleteCard() {
        this._element.remove();
        this._element = null;
    };

    _likeCard() {
        this._cardLikeButton.classList.toggle('elements__card-like_active');
    };

    render() {
        this._element = this._getTemplate();
        this._itemImage = this._element.querySelector('.elements__item-image');
        this._itemImage.src = this._data.link;
        this._element.querySelector('.elements__card-heading').textContent = this._data.name;
        this._itemImage.alt = this._data.name;
        
        this._addEventListeners();

        return this._element;
    };
};