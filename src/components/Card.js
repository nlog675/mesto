export default class Card {
    constructor(data, cardSelector, handleCardClick, {handleDeleteCard}, handlePutLike, handleDeleteLike, userId) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handlePutLike = handlePutLike;
        this._handleDeleteLike = handleDeleteLike;
        this._likes = data.likes;
        this._cardId = data._id
        this._ownerId = data.owner._id;
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

        this._itemImage.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));

        this._cardLikeButton.addEventListener('click', () => {
            if (this._cardLikeButton.classList.contains('elements__card-like_active')) {
                this._handleDeleteLike(this)
            } else {
                this._handlePutLike(this)
            }
        })
    };

    countLikes(likes) {
        this._likeCounter = this._element.querySelector('.elements__card-like-counter')
        if (likes.length === 0) {
            this._likeCounter.textContent = '';
        } else {
            this._likeCounter.textContent = likes.length;
        }
    }

    putLike() {
        this._cardLikeButton.classList.add('elements__card-like_active')
    }

    deleteLike() {
        this._cardLikeButton.classList.remove('elements__card-like_active')
    }

    _checkLike() {
        this._likes.forEach((item) => {
            if(item._id === this._userId) {
                this._cardLikeButton.classList.add('elements__card-like_active');
            }
        })
    }

    _whoseCard() {
        // console.log(this._userId);
        // console.log(this._ownerid);
        if (this._ownerId !== this._userId) {
            this._deleteIcon.remove();
        }
    }

    deleteCard() {
        this._element.remove();
        this._element = null
    }

    render() {
        this._element = this._getTemplate();
        this._itemImage = this._element.querySelector('.elements__item-image');
        this._itemImage.src = this._data.link;
        this._element.querySelector('.elements__card-heading').textContent = this._data.name;
        this._itemImage.alt = this._data.name;
        this._deleteIcon = this._element.querySelector('.elements__card-delete');
        this._cardLikeButton = this._element.querySelector('.elements__card-like');
        
        
        this._checkLike();
        this.countLikes(this._likes);
        this._whoseCard();
        this._addEventListeners();

        return this._element;
    };
};