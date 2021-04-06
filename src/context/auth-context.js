import * as React from 'react'

// import {useAuthListener} from 'hooks/use-auth-listener'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  // const {user} = useAuthListener()

  // const value = React.useMemo(() => user, [user])

  return <AuthContext.Provider value={[]} {...props} />
}

/**
 * A hook for fast access to the authentificated user context data
 *
 * @returns {object} A user object
 */
function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export {AuthProvider, useAuth}
