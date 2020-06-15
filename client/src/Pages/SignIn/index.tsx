import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as navPaths from '../../utils/router';
import { useFirebase } from 'react-redux-firebase';
import styles from './index.scss';
import WithAuth from '../../Hocs/WithAuth';

interface User {
  email: string;
  password: string;
}

enum FormInputType {
  email,
  password,
}

const SignIn: React.FC = (props: any) => {
  const { authError } = props;
  const [emailValue, setEmail] = useState<string>('');
  const [passwordValue, setPassword] = useState<string>('');

  const [isSendingData, setSendingData] = useState<boolean>(false);

  const firebase = useFirebase();

  const onChange: { [key in FormInputType]: Function } = {
    [FormInputType.email]: setEmail,
    [FormInputType.password]: setPassword,
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingData(true);
    const credentials: User = {
      email: emailValue,
      password: passwordValue,
    };
    firebase.login(credentials).finally(() => {
      setSendingData(false);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={submitForm} noValidate>
          <h2 className={styles.header}>Sign In</h2>
          {authError ? <p className={styles.errorMsg}>{authError.message}</p> : null}
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
            <button
              disabled={isSendingData}
              type="submit"
              className={`${isSendingData ? styles.btnSpinner : styles.btnActive} ${
                styles.btnPrimary
              }`}
            >
              <span>Sign In</span>
            </button>
            <Link to={navPaths.SIGN_UP}>Dont have account? create one</Link>
            <Link to={navPaths.PASSWORD_FORGET}>Forgot password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithAuth(withRouter(SignIn));
