import {Redirect, Route, Switch} from 'react-router-dom'

import {Signin} from './signin'
import {SignUp} from './signup'

function UnauthenticatedPages() {
  return (
    <Switch>
      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/signup">
        <SignUp />
      </Route>

      <Redirect to="/signin" />
    </Switch>
  )
}

function UnauthenticatedApp() {
  return <UnauthenticatedPages />
}

export default UnauthenticatedApp
