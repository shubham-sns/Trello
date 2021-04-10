import React from 'react'

import {useAuthContext} from 'context/auth-context'
import {Loader} from 'semantic-ui-react'

const AuthenticatedApp = React.lazy(() => import('pages/authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('pages/unauthenticated-app'))

function App() {
  const user = useAuthContext()

  return (
    <React.Suspense fallback={<Loader>Loading...</Loader>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
