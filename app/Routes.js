import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './pages/App';
import HomePage from './pages/homePage';
import MainLayout from './components/mainLayout';

export default () => (
  <App>
    <MainLayout>
      <Route
        path="/"
        render={() => (
          <Switch>
            <Route path="/" exact component={HomePage}/>
          </Switch>
        )}
      />
    </MainLayout>
  </App>
);

