import app from 'firebase/app';
require('firebase/auth');

//TODO: Понять, можно ли экстендить этот класс от класса firebase
class Firebase {
  auth: app.auth.Auth;

  constructor(config: Object) {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password);
    }
    return Promise.reject();
  }
}

export default Firebase;
