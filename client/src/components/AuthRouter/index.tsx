import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as navPath from '../../utils/router';
import SignIn from '../../Pages/SignIn/container';
import SignUp from '../../Pages/SignUp/container';
import styles from './index.scss';
import AppRouter from '../AppRouter';

const AuthRouter: React.FC = (props: any) => {
  const { auth } = props;

  return (
    <BrowserRouter>
      {auth.isEmpty ? <Redirect to={navPath.SIGN_IN} /> : <Redirect to={navPath.LANDING} />}
      <div>
        <Switch>
          <Route component={AppRouter} path={navPath.LANDING} exact />
          <Route component={SignIn} path={navPath.SIGN_IN} exact />
          <Route component={SignUp} path={navPath.SIGN_UP} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AuthRouter;
