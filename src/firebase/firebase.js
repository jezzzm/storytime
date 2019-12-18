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
  doSignOut = () => {
    console.log('in firebase')
    return this.auth.signOut();
  }

  //password changes
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //user db methods
  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users').get();

  //drawing db methods
  getDrawing = id => this.db.collection('drawings').doc(id).get();
  getAllDrawings = () => this.db.collection('drawingList').doc('allIDs').get();

  //story db methods
  saveStory = (data, sid=false) => {
    if (!sid) {
      return this.db.collection('stories').add(data); //save new
    } else {
      return this.db.collection('stories').doc(sid).set(data, {merge: true}); //overwrite existing
    }
  }
  getStory = sid => this.db.collection('stories').doc(sid).get();
  getUserStories = uid => this.db.collection('stories').where("uid", "==", uid).get();

}
