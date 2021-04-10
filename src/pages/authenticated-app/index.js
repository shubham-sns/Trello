import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import {Navbar} from 'components/navbar'
import {BoardsPage} from './boards'
import {Container} from 'semantic-ui-react'
import {BoardDataPage} from './board-data'

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/boards">
        <Container as="main">
          <BoardsPage />
        </Container>
      </Route>

      <Route path="/board/:id">
        <BoardDataPage />
      </Route>

      <Redirect to="/boards" />
    </Switch>
  )
}

function AuthenticatedApp() {
  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <AuthenticatedRoutes />
    </div>
  )
}

export default AuthenticatedApp
