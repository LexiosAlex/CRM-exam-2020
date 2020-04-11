import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SideNav from '../Sidenav';
import * as navPath from '../../utils/router';
import Account from '../../Pages/Account';
import Landing from '../../Pages/Landing';
import Admin from '../../Pages/Admin';
import Home from '../../Pages/Home';
import PwForget from '../../Pages/PasswordForget';
import SignIn from '../../Pages/SignIn';
import SignUp from '../../Pages/SignUp';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <SideNav />
      <div className="container">
        <Switch>
          <Route component={Landing} path={navPath.LANDING} exact />
          <Route component={Account} path={navPath.ACCOUNT} exact />
          <Route component={Admin} path={navPath.ADMIN} exact />
          <Route component={Home} path={navPath.HOME} exact />
          <Route component={PwForget} path={navPath.PASSWORD_FORGET} exact />
          <Route component={SignIn} path={navPath.SIGN_IN} exact />
          <Route component={SignUp} path={navPath.SIGN_UP} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
