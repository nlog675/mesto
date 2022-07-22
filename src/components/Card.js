import PopupWithImage from "./PopupWithImage.js";

export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardName = data.name;
        this._cardPic = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    _handleCardClick() {
        this._handleCardClick({
            name: this._cardName,
            link: this._cardPic,
        })
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

        this._itemImage.addEventListener('click', () => {
            const popupPicture = document.querySelector('.popup-picture');
            const popupWithImage = new PopupWithImage(popupPicture);
            popupWithImage.open(this._cardPic, this._cardName);

            popupWithImage.setEventListeners();
        });
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
        this._itemImage.src = this._cardPic;
        this._element.querySelector('.elements__card-heading').textContent = this._cardName;
        this._itemImage.alt = this._cardName;
        
        this._addEventListeners();

        return this._element;
    };
};