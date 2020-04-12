import app from 'firebase/app';

class Firebase {
  auth: app.auth.Auth;

  constructor(config: Object) {
    app.initializeApp(config);
    // todo: fix auth, remove log
    console.log(config);
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
