import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useFirebase } from 'react-redux-firebase';
import { Box } from '@material-ui/core';
import * as navPaths from '../../utils/router';
import WithAuth from '../../Hocs/WithAuth';
import {
  StyledButtonPrimary,
  StyledInputWrapper,
  StyledActionsContainer,
  StyledErrorMsg,
  StyledHead,
  StyledWrapper,
} from './SignUp.style';

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

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSendingData(true);
    firebase.createUser({ email, password }, { name }).finally(() => setSendingData(false));
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <StyledWrapper>
        <form onSubmit={handleSubmitForm} noValidate>
          <StyledHead>Sign Up</StyledHead>
          {authError ? <StyledErrorMsg>{authError.message}</StyledErrorMsg> : null}
          <StyledInputWrapper>
            <label htmlFor="name">name</label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              formNoValidate
              onChange={(event) => onChange[FormInputType.name](event.target.value)}
              value={name}
            />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              name="email"
              formNoValidate
              onChange={(event) => onChange[FormInputType.email](event.target.value)}
              value={email}
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
              value={password}
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
              <span>Sign Up</span>
            </StyledButtonPrimary>
            <Link to={navPaths.SIGN_IN}>Already registered</Link>
            <Link to={navPaths.PASSWORD_FORGET}>Forgot password</Link>
          </StyledActionsContainer>
        </form>
      </StyledWrapper>
    </Box>
  );
};

export const WrappedSignUp = WithAuth(withRouter(SignUp));
