import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './app/store';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

//pre-RTK refactor
//const store = createStore(reducers, compose(applyMiddleware(thunk)));
//import { reducers } from './reducers';
//import { createStore, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';