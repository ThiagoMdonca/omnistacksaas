import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import Store from './store';
import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <Provider store={Store}>
    <>
      <Routes />
      <ReduxToastr />
      <GlobalStyle />
    </>
  </Provider>
);

export default App;
