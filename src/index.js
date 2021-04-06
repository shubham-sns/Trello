import React from 'react'
import ReactDOM from 'react-dom'
import 'fomantic-ui-css/semantic.min.css';

import App from './app'
import {AppProviders} from './context'

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
)
