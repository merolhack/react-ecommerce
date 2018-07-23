// Polyfills
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
// React + Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import './globalStyle';
import reducer from './reducer';
import Routes from './Routes';

const store = createStore(reducer);

ReactDOM.render((
  <Provider store={store}>
    <Router basename="/react-ecommerce">
      <Routes />
    </Router>
  </Provider>), document.getElementById('root'));
registerServiceWorker();
