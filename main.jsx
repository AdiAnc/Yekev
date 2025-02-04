import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import Order from './components/Orders.jsx'

import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/rootReducer.js' 
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
)

