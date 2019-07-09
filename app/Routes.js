import React from 'react';
import { Switch, Route } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
// import routes from './constants/routes';
import App from './pages/App';
import HomePage from './pages/homePage';
import MainLayout from './components/mainLayout';

export default () => (
  <App>
    <MainLayout>
      <Router>
        <Route
          path="/"
          render={() => (
            <Switch>
              <Route path="/" exact component={HomePage} />
            </Switch>
          )}
        />
      </Router>
    </MainLayout>
  </App>
);
