import {popupAboutYou, popupYourName} from './index.js';

export default class UserInfo {
  constructor(profileName, profileAbout) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  }

  getUserInfo() {
    this._userInfo = {
      inputName: this._profileName.textContent,
      inputAbout: this._profileAbout.textContent, 
    }
    return this._userInfo
  }

  setUserInfo() {
    this._profileName.textContent = popupYourName.value;
    this._profileAbout.textContent = popupAboutYou.value;
  }
}