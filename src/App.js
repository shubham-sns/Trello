import {useAuthListener} from 'api/auth'
import React from 'react'

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('pages/unauthenticated-app'))

function App() {
  const {user} = useAuthListener()

  return (
    <React.Suspense fallback="loading">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
