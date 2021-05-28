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
  LoadingSpinner,
} from './SignUp.style';
import { useTranslation } from 'react-i18next';

enum FormInputType {
  email,
  password,
  name,
}

const SignUp: React.FC = (props: any) => {
  const { authError } = props;
  const { t } = useTranslation();

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
          <StyledHead>{t('loginPage.signUp')}</StyledHead>
          {authError ? <StyledErrorMsg>{authError.message}</StyledErrorMsg> : null}
          <StyledInputWrapper>
            <label htmlFor="name">{t('name')}</label>
            <input
              type="text"
              placeholder={t('loginPage.namePlaceholder')}
              name="name"
              formNoValidate
              onChange={(event) => onChange[FormInputType.name](event.target.value)}
              value={name}
            />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor="email">{t('loginPage.email')}</label>
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
            <label htmlFor="password">{t('loginPage.password')}</label>
            <input
              type="password"
              placeholder={t('loginPage.passwordPlaceholder')}
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
              {isSendingData ? (
                <Box display="flex">
                  <LoadingSpinner />
                </Box>
              ) : (
                <span>{t('loginPage.signUp')}</span>
              )}
            </StyledButtonPrimary>
            <Link to={navPaths.SIGN_IN}>{t('loginPage.alreadyRegistered')}</Link>
            <Link to={navPaths.PASSWORD_FORGET}>{t('loginPage.forgotPassword')}</Link>
          </StyledActionsContainer>
        </form>
      </StyledWrapper>
    </Box>
  );
};

export const WrappedSignUp = WithAuth(withRouter(SignUp));
