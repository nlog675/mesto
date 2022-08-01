import {popupAboutYou, popupYourName, profileAbout, profileName} from '../utils/constants.js';

export default class UserInfo {
  constructor(profileName, profileAbout) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  };

  getUserInfo() {
    this._userInfo = {
      inputName: this._profileName.textContent,
      inputAbout: this._profileAbout.textContent, 
      userId: this._userId,
    }
    return this._userInfo;
  };

  setUserInfo(inputValues) {
    this._profileName.textContent = inputValues.name;
    this._profileAbout.textContent = inputValues.about;
    // this._userId = data._id;
  };
};