import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import NetworkDetector from '../NetworkDetector';
import SideNav from '../Sidenav';
import Notifier from '../Notifier';
import * as navPath from '../../utils/router';
import Account from '../../pages/Account';
import Stats from '../../pages/Stats';
import UsersTable from '../../pages/UsersTable';
import Tasks from '../../pages/Tasks';
import AppHeader from '../Header';

import { LayoutContainer } from './AppRouter.styles';

export const AppRouter: React.FC = () => {
  return (
    <SnackbarProvider>
      <NetworkDetector />
      <Notifier />
      <BrowserRouter>
        <AppHeader />
        <LayoutContainer>
          <SideNav />
          <div>
            <Switch>
              <Route component={Tasks} path={navPath.TASKS} exact />
              <Route component={Account} path={navPath.ACCOUNT} exact />
              <Route component={Stats} path={navPath.STATS} exact />
              <Route component={UsersTable} path={navPath.USERS} exact />
            </Switch>
          </div>
        </LayoutContainer>
      </BrowserRouter>
    </SnackbarProvider>
  );
};
