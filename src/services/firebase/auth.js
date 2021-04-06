import {auth} from './firebase'

const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

const signOut = () => auth.signOut()

const passwordReset = email => auth.sendPasswordResetEmail(email)

const passwordUpdate = password => auth.currentUser.updatePassword(password)

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  passwordReset,
  passwordUpdate,
}
