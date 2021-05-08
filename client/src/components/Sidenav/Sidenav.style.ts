import styled, { css } from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

interface DrawerProps {
  $isOpen: boolean;
}

interface StyledListItemProps {
  $isActive: boolean;
}

const drawerOpen = css`
  width: 240px;
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
`;

const drawerClose = css`
  width: 56px !important;
  overflow-x: hidden;
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
`;

export const StyledDrawer = styled(Drawer)<DrawerProps>`
  width: 240px;
  flex-shrink: 0;
  white-space: nowrap;
  ${({ $isOpen }) => ($isOpen ? drawerOpen : drawerClose)}
`;

export const StyledListItem = styled(ListItem)<StyledListItemProps>`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: inherit;

  && {
    background-color: ${({ $isActive }) => ($isActive ? '#3232321A' : 'inherit')};
  }

  && svg {
    color: ${({ $isActive }) => $isActive && '#323232'};
  }
`;

export const StyledList = styled(List)<DrawerProps>`
  && {
    margin-top: 140px;
    margin-bottom: 60px;

    a {
      text-decoration: none;
      color: #323232;
    }
  }

  ${({ $isOpen }) => ($isOpen ? drawerOpen : drawerClose)}
`;
