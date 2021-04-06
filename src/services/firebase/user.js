import {auth} from './firebase'

const getUser = () => auth.currentUser

export {getUser}
