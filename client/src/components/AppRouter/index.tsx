import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import NetworkDetector from '../NetworkDetector';
import SideNav from '../Sidenav';
import Notifier from '../Notifier';
import * as navPath from '../../utils/router';
import Account from '../../Pages/Account';
// import Landing from '../../Pages/Landing';
import Admin from '../../Pages/Admin';
import UsersTable from '../../Pages/UsersTable';
import Tasks from '../../Pages/Tasks';
import AppHeader from '../Header';

import styles from './index.scss';

const AppRouter: React.FC = () => {
  return (
    <SnackbarProvider>
      <NetworkDetector />
      <Notifier />
      <BrowserRouter>
        <AppHeader />
        <div className={styles.layoutContainer}>
          <SideNav />
          <div>
            <Switch>
              <Route component={Tasks} path={navPath.TASKS} exact />
              <Route component={Account} path={navPath.ACCOUNT} exact />
              <Route component={Admin} path={navPath.STATS} exact />
              <Route component={UsersTable} path={navPath.USERS} exact />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default AppRouter;
