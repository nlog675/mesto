class UserInfo {
  constructor(profileName, profileAbout) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  }

  getUserInfo() {
    this._userInfo = {
      name: this.profileName.textContent,
      about: this._profileAbout.textContent, 
    }
    return this._userInfo
  }

  setUserInfo() {
    this._profileName.textContent = inputName.value;
    this._profileAbout.textContent = inputAbout.value;
  }
}