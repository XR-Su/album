// @flow
import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import type { Store } from '../reducers/types';
import Routes from '../Routes';
import AppProvider from '../store/appContext';

export default class Root extends Component<Props> {
  render() {
    return (
      <AppProvider>
        <Routes />
      </AppProvider>
    );
  }
}
