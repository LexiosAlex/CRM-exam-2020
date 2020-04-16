import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as navPaths from '../../utils/router';
import { useFirebase } from 'react-redux-firebase';
import styles from './index.scss';
import WithAuth from '../../Hocs/WithAuth';
import Loading from '../../components/Loading';

interface User {
  email: string;
  password: string;
}

enum FormInputType {
  email,
  password,
}

const SignIn: React.FC = (props: any) => {
  const { auth } = props;
  const [emailValue, setEmail] = useState<string>('');
  const [passwordValue, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const firebase = useFirebase();

  const onChange: { [key in FormInputType]: Function } = {
    [FormInputType.email]: setEmail,
    [FormInputType.password]: setPassword,
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const credentials: User = {
      email: emailValue,
      password: passwordValue,
    };
    firebase.login(credentials).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  return (
    <>
      {!auth.isLoaded ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <form onSubmit={submitForm} noValidate>
              <h2 className={styles.header}>Sign In</h2>
              {errorMessage ? <p className={styles.errorMsg}>{errorMessage}</p> : null}
              <div className={styles.inputWrapper}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  formNoValidate
                  onChange={(event) => onChange[FormInputType.email](event.target.value)}
                  value={emailValue}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  formNoValidate
                  onChange={(event) => onChange[FormInputType.password](event.target.value)}
                  value={passwordValue}
                />
              </div>
              <div className={styles.actionsWrapper}>
                <button type="submit" className="btn-primary">
                  Sign In
                </button>
                <Link to={navPaths.SIGN_UP}>Dont have account? create one</Link>
                <Link to={navPaths.PASSWORD_FORGET}>Forgot password</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuth(withRouter(SignIn));
