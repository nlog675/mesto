export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatar) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  };

  getUserInfo() {
    return {
      inputName: this._profileName.textContent,
      inputAbout: this._profileAbout.textContent, 
      userId: this._userId,
    }
  };

  setNewAvatar(data) {
    this._profileAvatar.src = data.avatar;
    this._profileAvatar.alt = data.name;
  }

  setUserInfo(inputValues) {
    this._profileName.textContent = inputValues.name;
    this._profileAbout.textContent = inputValues.about;
  };
};