import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as navPath from '../../utils/router';
import SignIn from '../../Pages/SignIn';
import SignUp from '../../Pages/SignUp';
import AppRouter from '../AppRouter';
import WithAuth from '../../Hocs/WithAuth';
import PwForget from '../../Pages/PasswordForget';
import Loading from '../Loading';

const AuthRouter: React.FC = (props: any) => {
  const { auth } = props;
  if (!auth.isLoaded) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {auth.isEmpty ? <Redirect to={navPath.SIGN_IN} /> : <Redirect to={navPath.LANDING} />}
      <div>
        <Switch>
          <Route component={AppRouter} path={navPath.LANDING} exact />
          <Route component={SignIn} path={navPath.SIGN_IN} exact />
          <Route component={SignUp} path={navPath.SIGN_UP} exact />
          <Route component={PwForget} path={navPath.PASSWORD_FORGET} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default WithAuth(AuthRouter);
