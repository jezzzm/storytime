import app from 'firebase/app';
import 'firebase/auth';
import Config from './config'


export default class Firebase {
  constructor() {
    app.initializeApp(Config);
    this.auth = app.auth();

  }


  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider();

    this.auth
      .signInWithPopup(provider)
      .then(res => {
        const user = res.user;
        console.log(user);
      })
      .catch(console.log);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

}
