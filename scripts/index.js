const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close')
const popupYourName = document.querySelector('.popup__input-name')
const popupAboutYou = document.querySelector('.popup__input-about')
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__description')
const formElement = document.querySelector('.popup__form')

function openPopup(popupElement) {
    popupElement.classList.add('popup_isOpen')
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_isOpen')
}

editButton.addEventListener('click', function() {
    openPopup(popup)
    popupYourName.value = 'Жак-Ив Кусто'
    popupAboutYou.value = 'Исследователь океана'
})

popupCloseButton.addEventListener('click', function() {
    closePopup(popup)
    //profileName.textContent = popupYourName.value
    //profileAbout.textContent = popupAboutYou.value
})

formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    profileName.textContent = popupYourName.value
    profileAbout.textContent = popupAboutYou.value
    closePopup(popup)
})