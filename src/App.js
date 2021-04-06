import React from 'react'

import { useAuthContext } from 'context/auth-context'

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('pages/unauthenticated-app'))

function App() {
  const user = useAuthContext()

  return (
    <React.Suspense fallback="loading...">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
