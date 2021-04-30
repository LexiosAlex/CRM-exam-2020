import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as navPaths from '../../utils/router';
import { useFirebase } from 'react-redux-firebase';
import WithAuth from '../../Hocs/WithAuth';
import { Box } from '@material-ui/core';
import {
  StyledButtonPrimary,
  StyledInputWrapper,
  StyledActionsContainer,
  StyledErrorMsg,
  StyledHead,
  StyledWrapper,
  LoadingSpinner,
} from './SignIn.style';

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

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
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
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <StyledWrapper>
        <form onSubmit={handleSubmitForm} noValidate>
          <StyledHead>Sign In</StyledHead>
          {authError ? <StyledErrorMsg>{authError.message}</StyledErrorMsg> : null}
          <StyledInputWrapper>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              name="email"
              formNoValidate
              onChange={(event) => onChange[FormInputType.email](event.target.value)}
              value={emailValue}
            />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              formNoValidate
              onChange={(event) => onChange[FormInputType.password](event.target.value)}
              value={passwordValue}
            />
          </StyledInputWrapper>
          <StyledActionsContainer
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginLeft="auto"
            marginRight="auto"
            marginTop="0.5rem"
            marginBottom="0.5rem"
          >
            <StyledButtonPrimary disabled={isSendingData} type="submit" $isLoading={isSendingData}>
              {isSendingData ? (
                <Box display="flex">
                  <LoadingSpinner />
                </Box>
              ) : (
                <span> Sign Up</span>
              )}
            </StyledButtonPrimary>
            <Link to={navPaths.SIGN_UP}>Dont have account? create one</Link>
            <Link to={navPaths.PASSWORD_FORGET}>Forgot password</Link>
          </StyledActionsContainer>
        </form>
      </StyledWrapper>
    </Box>
  );
};

export const WrappedSignIn = WithAuth(withRouter(SignIn));
