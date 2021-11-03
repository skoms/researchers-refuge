import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/reset.css'
import './styles/global.css'
import App from './app/App'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'

require('dotenv').config()

const workerActive = false

if (workerActive) {
  const { worker } = require('./mocks/browser')
  worker.start()
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}
store.subscribe(render)
render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
