// @flow
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import MainLayout from '../components/mainLayout';
import HomePage from './homePage';

export default class PageRoot extends Component<Props> {
  render() {
    return (
      <Router>
        <MainLayout>
          <Route
            path="/"
            render={() => (
              <Switch>
                <Route path="/" exact component={HomePage} />
              </Switch>
            )}
          />
        </MainLayout>
      </Router>
    );
  }
}
