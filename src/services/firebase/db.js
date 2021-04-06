import {db} from './firebase'
import {getUser} from './user'

const boardsRef = db.ref('boards')
const listsRef = db.ref('lists')
const cardsRef = db.ref('cards')

/**
 *
 * @param {string} id firebase auth uid
 * @param {string} username
 * @param {string} email
 * @returns
 */
const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  })

const onceGetUsers = () => db.ref('users').once('value')

export {createUser, onceGetUsers}
