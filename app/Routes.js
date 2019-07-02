import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './pages/App';
import HomePage from './pages/HomePage';
import CounterPage from './pages/CounterPage';
import Test from './components/Test';
import MainLayout from './components/MainLayout';

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
    {/*<Switch>*/}
    {/*  <Route path={routes.COUNTER} component={CounterPage} />*/}
    {/*  <Route path={routes.TEST} component={MainLayout} />*/}
    {/*  <Route path={routes.HOME} component={HomePage} />*/}
    {/*</Switch>*/}
  </App>
);
