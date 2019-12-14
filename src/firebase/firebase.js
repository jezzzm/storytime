import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAteebQLCFtzi70eOHkoyR3nEVfylWVGfM",
  authDomain: "storytime-261823.firebaseapp.com",
  databaseURL: "https://storytime-261823.firebaseio.com",
  projectId: "storytime-261823",
  storageBucket: "storytime-261823.appspot.com",
  messagingSenderId: "1008445946394",
  appId: "1:1008445946394:web:2300d3f52ff4ba09d1afa3"
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
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
