import { isNumeric } from '../utilities/tools'

export class Protect {

  static logIn() {
    console.log("Logged in")
    localStorage.setItem('Auth', 'true');
  }

  static logOut() {
    localStorage.setItem('Auth', 'false');
    console.log("Logged out")
    window.location.reload()
  }

  static isLoggedIn() {
    const isLogged = localStorage.getItem('Auth')
    const isNum = isNumeric(JSON.parse(localStorage.getItem('Token'))["id"])

    return new Promise((resolve) => {
      setTimeout(() => {
        if (isLogged === 'true' && !isNaN(isNum)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
}
