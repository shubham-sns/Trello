import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECTID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECTID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
}

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

const {FieldValue} = firebase.firestore

export {firebaseApp, FieldValue}
