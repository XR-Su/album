import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import AppProvider from './store/appContext';
import PageRoot from './pages/PageRoot';
import './app.global.css';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <AppProvider>
      <PageRoot />
    </AppProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./pages/PageRoot', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./pages/PageRoot').default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
