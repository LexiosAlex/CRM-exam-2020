import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { withRouter } from 'react-router';
import * as navPaths from '../../utils/router';
import { useFirebase } from 'react-redux-firebase';
import WithAuth from '../../Hocs/WithAuth';
import LanguageSelect from '../../components/LanguageSelect';
import {
  StyledButtonPrimary,
  StyledInputWrapper,
  StyledActionsContainer,
  StyledErrorMsg,
  StyledHead,
  StyledWrapper,
  LoadingSpinner,
} from './SignIn.style';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
          <StyledHead>{t('loginPage.signIn')}</StyledHead>
          {authError ? <StyledErrorMsg>{authError.message}</StyledErrorMsg> : null}
          <StyledInputWrapper>
            <label htmlFor="email">{t('loginPage.email')}</label>
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
            <label htmlFor="password">{t('loginPage.password')}</label>
            <input
              type="password"
              placeholder={t('loginPage.passwordPlaceholder')}
              name="password"
              formNoValidate
              onChange={(event) => onChange[FormInputType.password](event.target.value)}
              value={passwordValue}
            />
          </StyledInputWrapper>
          <Box
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
                <span>{t('loginPage.signIn')}</span>
              )}
            </StyledButtonPrimary>
          </Box>
        </form>
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
          <Link to={navPaths.SIGN_UP}>{t('loginPage.dontHaveAccount')}</Link>
          <Link to={navPaths.PASSWORD_FORGET}>{t('loginPage.forgotPassword')}</Link>
          <Box paddingTop="8px">
            <LanguageSelect />
          </Box>
        </StyledActionsContainer>
      </StyledWrapper>
    </Box>
  );
};

export const WrappedSignIn = WithAuth(withRouter(SignIn));
