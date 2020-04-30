import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SideNav from '../Sidenav';
import * as navPath from '../../utils/router';
import Account from '../../Pages/Account';
// import Landing from '../../Pages/Landing';
import Admin from '../../Pages/Admin';
import Home from '../../Pages/Home';
import PwForget from '../../Pages/PasswordForget';
import styles from './index.scss';
import Tasks from '../../Pages/Tasks';
import AppHeader from '../Header';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <div className={styles.layoutContainer}>
        <SideNav />
        <div>
          <Switch>
            <Route component={Tasks} path={navPath.LANDING} exact />
            <Route component={Account} path={navPath.ACCOUNT} exact />
            <Route component={Admin} path={navPath.ADMIN} exact />
            <Route component={Home} path={navPath.HOME} exact />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
