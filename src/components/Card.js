import { data } from "autoprefixer";
import { popupDeleteCard, popupPicture } from "../utils/constants";
import PopupWithImage from "./PopupWithImage";
import {popupWithImage} from "../pages/index.js"

export default class Card {
    constructor(data, cardSelector, handleCardClick, {handleDeleteCard}, handleLikeCard, userId) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this._likes = data.likes;
        this._cardId = data._id
        this._ownerid = data.owner._id;
        this._userId = userId;
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
        this._deleteIcon.addEventListener('click', () => this._handleDeleteCard(this._cardId));

        this._cardLikeButton = this._element.querySelector('.elements__card-like');

        this._cardLikeButton.addEventListener('click', () => this._handleLikeCard());

        this._itemImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    };

    _countLikes() {
        if (this._likes.length > 0) {
        this._element.querySelector('.elements__card-like-counter').textContent = this._likes.length;
        }
    }

    _whoseCard() {
        // console.log(this._userId);
        // console.log(this._ownerid);
        if (this._ownerid !== this._userId) {
            this._deleteIcon.remove();
        }
    }

    deleteCard() {
        this._element.remove();
        this._element = null
    }

    likeCard() {
        this._handleLikeCard(this._data._id)
            .then(() => {
                this._cardLikeButton.classList.toggle('elements__card-like_active');
            })
        
    };

    render() {
        this._element = this._getTemplate();
        this._itemImage = this._element.querySelector('.elements__item-image');
        this._itemImage.src = this._data.link;
        this._element.querySelector('.elements__card-heading').textContent = this._data.name;
        this._itemImage.alt = this._data.name;
        this._deleteIcon = this._element.querySelector('.elements__card-delete');
        
        
        this._countLikes();
        this._whoseCard();
        this._addEventListeners();

        return this._element;
    };
};