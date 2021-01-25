import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Private from './private';
import Guest from './guest';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';
import Main from '~/pages/Main';

import history from './history';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest path="/signin" component={SignIn} />
      <Guest path="/signup" component={SignUp} />
      <Private path="/" exact component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
