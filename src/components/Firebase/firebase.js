import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { firebaseConfig, storage } from '../../constants/secrets';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    // *** Storage ***
    this.storage = app.storage();

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();

    /* Enable off-line mode */
    this.db.enablePersistence().catch((err) => {
      if (err.code === 'failed-precondition') {
        console.log(
          'Error code: ' +
            err.code +
            'Multiple tabs open, persistence can only be enabled in one tab at a a time.',
        );
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        console.log(
          'Error code: ' +
            err.code +
            'The current browser does not support all of the features required to enable persistence',
        );
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) =>
    this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  // *** Item API ***

  item = (uid) => this.db.doc(`items/${uid}`);

  items = () => this.db.collection('items');

  // *** Comment API ***

  comment = (itemUid, commentUid) =>
    this.db.doc(`items/${itemUid}`).doc(`comments/${commentUid}`);

  comments = (itemUid) =>
    this.db.doc(`items/${itemUid}`).collection('comments');

  // *** Images API ***

  image = (pathToImage) => this.storage.ref(`/${pathToImage}`);

  // *** Messages API ***

  messages = (threadUid) =>
    this.db.doc(`messageThreads/${threadUid}`).collection('messages');

  messageThread = (threadUid) =>
    this.db.doc(`messageThreads/${threadUid}`);

  messageThreads = () => this.db.collection('messageThreads');
}

export default Firebase;
