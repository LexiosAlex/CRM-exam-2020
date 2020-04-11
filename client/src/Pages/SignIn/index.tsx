import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import * as navPaths from '../../utils/router';

// const formValid = state => {
//   const { formErrors, ...rest } = state;
//
//   let valid = true;
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });
//
//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });
//
//   return valid;
// };
//
// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

enum FormInputType {
  email,
  password,
}

const SignIn: React.FC = (props) => {
  const [emailValue, setEmail] = useState<string>('');
  const [passwordValue, setPassword] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>, inputType: FormInputType) => {
    switch (inputType) {
      case FormInputType.email:
        setEmail(event.target.value);
        break;
      case FormInputType.password:
        setPassword(event.target.value);
        break;
      default:
        return;
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  // handleSubmit = e => {
  //   const {onUserLogin} = this.props;
  //   e.preventDefault();
  //   if (formValid(this.state)) {
  //     onUserLogin(this.state.email, this.state.password)
  //   } else {
  //     console.log('Imposible to send data')
  //   }
  // };
  //
  // handleChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let formErrors = this.state.formErrors;
  //
  //   switch (name) {
  //     case "email":
  //       formErrors.email =
  //         emailRegex.test(value) && value.length > 0
  //           ? ""
  //           : "invalid email adress";
  //       break;
  //     case "password":
  //       formErrors.password =
  //         value.length < 8 && value.length > 0
  //           ? "password must be at least 8 characters"
  //           : "";
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   this.setState({ formErrors, [name]: value });
  // };

  // if (loggedIn) {
  //   return <Redirect push to="/" />;
  // }

  return (
    <div className="sign-in-container">
      <div className="sing-in__form-wrapper">
        <form onSubmit={submitForm} noValidate>
          <h2 className="sign-in__header">Sign In</h2>
          <div className="sign-in__input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              // className={formErrors.email.length > 0 ? 'inputError' : null}
              type="email"
              placeholder="example@mail.com"
              name="email"
              formNoValidate
              onChange={(event) => changeHandler(event, FormInputType.email)}
              value={emailValue}
            />
            {/*{emailValue.length > 0 && (*/}
            {/*  <span className="errorMessage">{formErrors.email}</span>*/}
            {/*)}*/}
          </div>
          <div className="sign-in__input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              // className={formErrors.password.length > 0 ? 'inputError' : null}
              type="password"
              placeholder="password"
              name="password"
              formNoValidate
              onChange={(event) => changeHandler(event, FormInputType.password)}
              value={passwordValue}
            />
            {/*{passwordValue.length > 0 && (*/}
            {/*  <span className="errorMessage">{formErrors.password}</span>*/}
            {/*)}*/}
          </div>
          <div className="createAccount">
            <button type="submit" className="btn-primary">
              Sign In
            </button>
            <Link to={navPaths.SIGN_UP}>Dont have account? create one</Link>
          </div>
          <div>
            <Link to={navPaths.PASSWORD_FORGET}>Forgot password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
