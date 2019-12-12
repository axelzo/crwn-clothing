import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyBtyq9hBXWf6aDUOacJpPRfWJLSqVbxz8A",
    authDomain: "crwn-db-fcccb.firebaseapp.com",
    databaseURL: "https://crwn-db-fcccb.firebaseio.com",
    projectId: "crwn-db-fcccb",
    storageBucket: "crwn-db-fcccb.appspot.com",
    messagingSenderId: "511413514599",
    appId: "1:511413514599:web:aa9eba0c5f1d7ad164ffc2"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log(`error creating user`, error.message);
      }
    }
   
    return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;