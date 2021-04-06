import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyDhupC7ItL5dVxpyC29BjgL7PnB9ho0diY",
  authDomain: "trello-e49b3.firebaseapp.com",
  projectId: "trello-e49b3",
  storageBucket: "trello-e49b3.appspot.com",
  messagingSenderId: "996962847717",
  appId: "1:996962847717:web:a85c9b6abdf48596163d0c"
};
 !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()


const auth = firebase.auth();
const db = firebase.database();

export { auth, db };

