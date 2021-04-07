import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import {Navbar} from 'components/navbar'
import {BoardsPage} from './boards'
import {Container} from 'semantic-ui-react'

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/boards">
        <BoardsPage />
      </Route>

      <Redirect to="/boards" />
    </Switch>
  )
}

function AuthenticatedApp() {
  return (
    <>
      <Navbar />
      <Container as="main" className="main__container">
        <AuthenticatedRoutes />
      </Container>
    </>
  )
}

export default AuthenticatedApp
