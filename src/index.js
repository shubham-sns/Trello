import React from 'react'
import ReactDOM from 'react-dom'
import 'fomantic-ui-css/semantic.min.css'

import {AppProviders} from './context'
import App from './app'
import 'styles/styles.css'

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
)
