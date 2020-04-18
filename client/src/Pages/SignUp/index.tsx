import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import { useFirebase } from 'react-redux-firebase';
import * as navPaths from '../../utils/router';
import styles from './index.scss';
import WithAuth from '../../Hocs/WithAuth';

interface NewUser {
  email: string;
  password: string;
  name: string;
}

enum FormInputType {
  email,
  password,
  name,
}

const SignUp: React.FC = (props: any) => {
  const { authError } = props;

  const [emailValue, setEmail] = useState<string>('');
  const [passwordValue, setPassword] = useState<string>('');
  const [nameValue, setName] = useState<string>('');

  const [isSendingData, setSendingData] = useState<boolean>(false);
  //TODO: made it with observables, asyncReducer

  const firebase = useFirebase();

  const onChange: { [key in FormInputType]: Function } = {
    [FormInputType.email]: setEmail,
    [FormInputType.password]: setPassword,
    [FormInputType.name]: setName,
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingData(true);
    const newUser: NewUser = {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    };

    firebase.createUser(newUser, { name: nameValue, email: emailValue }).finally(() => {
      setSendingData(true);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={submitForm} noValidate>
          <h2 className={styles.header}>Sign Up</h2>
          {authError ? <p className={styles.errorMsg}>{authError.message}</p> : null}
          <div className={styles.inputWrapper}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              formNoValidate
              onChange={(event) => onChange[FormInputType.name](event.target.value)}
              value={nameValue}
            />
          </div>
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
              <span>Sign Up</span>
            </button>
            <Link to={navPaths.SIGN_IN}>Already registered</Link>
            <Link to={navPaths.PASSWORD_FORGET}>Forgot password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithAuth(withRouter(SignUp));
