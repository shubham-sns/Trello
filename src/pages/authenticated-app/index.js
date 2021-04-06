import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import {signOut} from 'services/firebase/auth'

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Button onClick={signOut}>Logout</Button>
      </Route>

      <Redirect to="/dashboard" />
    </Switch>
  )
}

function AuthenticatedApp() {
  return <AuthenticatedRoutes />
}

export default AuthenticatedApp
