import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import Home from './components/Home';
import Confirm from './components/Confirm';
import Checkout from './components/Checkout';
import Foo from './components/Foo';

const Routes = ({ token }) => {
  if (token) {
    return (
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/confirm" exact component={Confirm} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/foo" exact component={Foo} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Route path="/" exact component={Login} />
      <Route path="/foo" exact component={Foo} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Routes);
