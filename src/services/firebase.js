import {firebaseApp, FieldValue} from 'lib/firebase'

/** Initializing firestore database */
const database = firebaseApp.firestore()

/**
 * Function used to check if a username already exists in database. Returns `1 | 0`
 *
 * @param {string} username Username to be checked
 * @return {Promise<number>} A promise of type number.
 */
async function doesUserExist(username) {
  const {docs} = await database
    .collection('users')
    .where('username', '==', username)
    .get()

  return docs.map(doc => doc.data()).length
}

/**
 * Function used to create a new user in the firestore
 *
 * @param {object} userObject The user data to be added to the collection
 *
 * @return {Promise<void>} A promise of type void.
 */
async function createFirestoreUser(userObject) {
  return database.collection('users').add(userObject)
}

export {doesUserExist, createFirestoreUser}
