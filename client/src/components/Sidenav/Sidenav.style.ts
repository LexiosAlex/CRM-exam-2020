import styled, { css } from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

interface DrawerProps {
  $isOpen: boolean;
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
export const StyledListItem = styled(ListItem)`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: inherit;
`;

export const StyledList = styled(List)<DrawerProps>`
  margin-top: 140px !important;
  margin-bottom: 60px !important;
  ${({ $isOpen }) => ($isOpen ? drawerOpen : drawerClose)}
`;
