const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const popupYourName = document.querySelector('.popup__input-name')
const popupAboutYou = document.querySelector('.popup__input-about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__description')
const formElement = document.querySelector('.popup__form')

function openPopup() {
    popup.classList.add('popup_isOpen')
    popupYourName.value = profileName.textContent
    popupAboutYou.value = profileAbout.textContent
}

function closePopup() {
    popup.classList.remove('popup_isOpen')
}

function formSubmit(event) {
    event.preventDefault()
    profileName.textContent = popupYourName.value
    profileAbout.textContent = popupAboutYou.value
    closePopup()
}

editButton.addEventListener('click', openPopup)

popupCloseButton.addEventListener('click', closePopup)

formElement.addEventListener('submit', formSubmit)