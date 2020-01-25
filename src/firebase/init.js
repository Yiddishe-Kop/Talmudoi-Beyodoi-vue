import app from "firebase"
import store from '@/store'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor(app) {
    app.initializeApp(config);

    /* Helper */
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.analytics = app.analytics();

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();

    /* Sync user status to Vuex store */
    app.auth().onAuthStateChanged(user => {
      store.commit('UPDATE_USER', user)
    })
  }

  // *** Auth API ***
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** Storage API ***
  storageRef = () => this.storage.ref();

  // *** User API ***
}

export default new Firebase(app)
