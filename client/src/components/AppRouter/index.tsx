import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SideNav from '../Sidenav';
import * as navPath from '../../utils/router';
import Account from '../../Pages/Account';
import Landing from '../../Pages/Landing';
import Admin from '../../Pages/Admin';
import Home from '../../Pages/Home';
import PwForget from '../../Pages/PasswordForget';
import styles from './index.scss';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.layoutContainer}>
        <SideNav />
        <div>
          <Switch>
            <Route component={Landing} path={navPath.LANDING} exact />
            <Route component={Account} path={navPath.ACCOUNT} exact />
            <Route component={Admin} path={navPath.ADMIN} exact />
            <Route component={Home} path={navPath.HOME} exact />
            <Route component={PwForget} path={navPath.PASSWORD_FORGET} exact />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
