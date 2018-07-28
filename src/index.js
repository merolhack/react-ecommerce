// Polyfills
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
// React + Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
// Own classes
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import './globalStyle';
import reducer from './reducer';
import Routes from './Routes';

const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk),
);
const baseName = (process.env.NODE_ENV !== 'development') ? '/react-ecommerce' : '/';

ReactDOM.render((
  <Provider store={store}>
    <Router basename={baseName}>
      <Routes />
    </Router>
  </Provider>), document.getElementById('root'));
registerServiceWorker();
