import {useState, useEffect} from 'react'
import {useMutation} from 'react-query'
import {firebaseApp} from 'lib/firebase'
import {createFirestoreUser, doesUserExist} from 'services/firebase'

const localStorageKey = '__auth-user__'

function useLogin(mutationConfig = {}) {
  return useMutation(
    ({email, password}) =>
      firebaseApp.auth().signInWithEmailAndPassword(email, password),
    {...mutationConfig},
  )
}

function useSignupMutation(mutationConfig = {}) {
  return useMutation(
    async data => {
      const usernameExist = await doesUserExist(data.username)

      if (usernameExist) {
        throw new Error('Username already exists, please try another!')
      } else {
        return firebaseApp
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(userCredential => {
            const {user} = userCredential

            user.updateProfile({
              displayName: data.username.toLowerCase(),
              photoURL: '',
            })

            return createFirestoreUser({
              userId: user.uid,
              username: data.username.toLowerCase(),
              photoURL: '',
              email: data.email,
              dateCreated: Date.now(),
              // favouriteBoards: [], // can add this in future
            })
          })
      }
    },
    {
      ...mutationConfig,
    },
  )
}

function useAuthListener() {
  const localStorageUser = JSON.parse(localStorage.getItem(localStorageKey))

  const [user, setUser] = useState(localStorageUser)

  useEffect(() => {
    const listener = firebaseApp.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        localStorage.setItem(localStorageKey, JSON.stringify(authUser))
        setUser(authUser)
      } else {
        localStorage.removeItem(localStorageKey)
        setUser(null)
      }
    })

    return () => listener()
  }, [])

  return {user}
}

export {useLogin, useSignupMutation, useAuthListener}
