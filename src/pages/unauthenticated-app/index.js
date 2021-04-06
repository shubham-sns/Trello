import Container from '@material-ui/core/Container'
import {Redirect, Route, Switch} from 'react-router-dom'

import makeStyles from '@material-ui/core/styles/makeStyles'

import {Login} from './login'
import {Signup} from './signup'

function UnauthenticatedPages() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Redirect to="/login" />
    </Switch>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    minWidth: '100vw',
  },
}))

function UnauthenticatedApp() {
  const classes = useStyles()

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <UnauthenticatedPages />
    </Container>
  )
}

export default UnauthenticatedApp
