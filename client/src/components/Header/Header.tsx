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

const AppHeader: React.FC = (props: any) => {
  const { email } = props.auth;
  const { name, type } = props.profile;
  const firebase = useFirebase();

  const logOutHandler = () => firebase.logout();

  return (
    <StyledHeader>
      <StyledLogo>
        <img src={logo} alt={'site logo'} />
        <p>volunteer</p>
      </StyledLogo>
      <StyledAccount>
        <Box alignSelf="flex-end">
          <StyledUserName>{`Name: ${name}`}</StyledUserName>
          <StyledInfoContainer>
            <p>{`Role: ${TITLE_USER_TYPE_MAP[type]}`}</p>
            <p>{`Email: ${email}`}</p>
          </StyledInfoContainer>
        </Box>
        <Box alignSelf="flex-end">
          <IconButton onClick={logOutHandler}>
            <ExitToAppIcon>logOut</ExitToAppIcon>
          </IconButton>
        </Box>
      </StyledAccount>
    </StyledHeader>
  );
};

export const Header = WithAuth(AppHeader);
