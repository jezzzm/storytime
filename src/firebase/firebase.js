import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Config from './config'


export default class Firebase {
  constructor() {
    app.initializeApp(Config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  //user sign in
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  doSignInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  };

  //sign out
  doSignOut = () => this.auth.signOut();

  //password changes
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //user db methods
  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users').get();

  //word db methods
  getWord = word => this.db.collection('words').doc(word).get();
  getAllWords = () => this.db.collection('wordList').get();
  getRandomDrawing = word => this.getWord(word).then(res => {
    const drawings = res.data().drawings;
    return drawings[ Math.floor(Math.random() * drawings.length) ]; //pseudo
  })


  //drawing db methods
  getDrawing = id => this.db.collection('drawings').doc(id).get();
  getAllDrawings = () => this.db.collection('drawingList').doc('allIDs').get();

}
