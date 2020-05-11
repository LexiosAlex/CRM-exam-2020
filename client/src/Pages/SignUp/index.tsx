import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import { useFirebase } from 'react-redux-firebase';
import * as navPaths from '../../utils/router';
import styles from './index.scss';
import WithAuth from '../../Hocs/WithAuth';

enum FormInputType {
  email,
  password,
  name,
}

const SignUp: React.FC = (props: any) => {
  const { authError } = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [isSendingData, setSendingData] = useState<boolean>(false);

  const firebase = useFirebase();

  const onChange: { [key in FormInputType]: Function } = {
    [FormInputType.email]: setEmail,
    [FormInputType.password]: setPassword,
    [FormInputType.name]: setName,
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingData(true);
    firebase.createUser({ email, password }, { name }).finally(() => setSendingData(false));
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
              value={name}
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
              value={email}
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
              value={password}
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
