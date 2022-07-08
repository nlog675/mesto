class Card {
    constructor(data, cardSelector, zoomPic) {
        this._cardName = data.name;
        this._cardPic = data.link;
        this._cardSelector = cardSelector;
        this._zoomPic = zoomPic;
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
        .addEventListener('click', this._deleteCard.bind(this));

        this._element.querySelector('.elements__card-like')
        .addEventListener('click', this._likeCard.bind(this));

        this._element.querySelector('.elements__item-image')
        .addEventListener('click', () => {
            this._zoomPic(this._cardPic, this._cardName);
        });
    };

    _deleteCard() {
        this._element.remove();
    };

    _likeCard() {
        this._element
        .querySelector('.elements__card-like')
        .classList.toggle('elements__card-like_active');
    };

    render() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__item-image').src = this._cardPic;
        this._element.querySelector('.elements__card-heading').textContent = this._cardName;
        this._element.querySelector('.elements__item-image').alt = this._cardName;
        
        this._addEventListeners();

        return this._element;
    };

};

export default Card;