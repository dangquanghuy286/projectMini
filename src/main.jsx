import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
const store = createStore(allReducers);
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import allReducers from './reducers/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
