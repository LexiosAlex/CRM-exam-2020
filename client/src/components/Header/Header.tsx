import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useFirebase } from 'react-redux-firebase';
import { Box } from '@material-ui/core';

import WithAuth from '../../Hocs/WithAuth';
import { TITLE_USER_TYPE_MAP } from '../../utils/users';

import {
  StyledLogo,
  StyledHeader,
  StyledUserName,
  StyledInfoContainer,
  StyledAccount,
} from './Header.style';
import logo from '../../media/logo/spiral.svg';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../LanguageSelect';

const AppHeader: React.FC = (props: any) => {
  const { email } = props.auth;
  const { name, type } = props.profile;
  const firebase = useFirebase();
  const { t } = useTranslation();

  const logOutHandler = () => firebase.logout();

  return (
    <StyledHeader>
      <StyledLogo>
        <img src={logo} alt={t('header.siteLogo')} />
        <p>volunteer</p>
      </StyledLogo>
      <Box marginLeft="56px" marginRight="auto">
        <LanguageSelect />
      </Box>
      <StyledAccount>
        <Box alignSelf="flex-end">
          <StyledUserName>{`${t('header.name')}: ${name}`}</StyledUserName>
          <StyledInfoContainer>
            <p>{`${t('header.role')}: ${TITLE_USER_TYPE_MAP[type]}`}</p>
            <p>{`${t('header.email')}: ${email}`}</p>
          </StyledInfoContainer>
        </Box>
        <Box alignSelf="flex-end">
          <IconButton onClick={logOutHandler}>
            <ExitToAppIcon>{t('header.logOut')}</ExitToAppIcon>
          </IconButton>
        </Box>
      </StyledAccount>
    </StyledHeader>
  );
};

export const Header = WithAuth(AppHeader);
