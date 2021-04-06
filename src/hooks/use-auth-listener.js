import {useState, useEffect} from 'react'
import {firebase} from 'services/firebase'

const localStorageKey = '__auth-user__'

function useAuthListener() {
  const localStorageUser = JSON.parse(localStorage.getItem(localStorageKey))

  const [user, setUser] = useState(localStorageUser)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
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

export {useAuthListener}
