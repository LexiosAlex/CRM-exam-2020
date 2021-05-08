import React from 'react';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import { Link, useLocation } from 'react-router-dom';

import { StyledDrawer, StyledListItem, StyledList } from './Sidenav.style';
import * as navPaths from '../../utils/router';
import { Box } from '@material-ui/core';

export const Sidenav: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledDrawer variant="permanent" $isOpen={open}>
        <StyledList $isOpen={open}>
          <StyledListItem button $isActive={pathname === navPaths.STATS}>
            <Link to={navPaths.STATS}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
            </Link>
            <ListItemText primary={'Dashboard'} />
          </StyledListItem>
          <StyledListItem button $isActive={pathname === navPaths.USERS}>
            <Link to={navPaths.USERS}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
            </Link>
            <ListItemText primary={'Users'} />
          </StyledListItem>
          <StyledListItem button $isActive={pathname === navPaths.TASKS}>
            <Link to={navPaths.TASKS}>
              <ListItemIcon>
                <ViewColumnIcon />
              </ListItemIcon>
            </Link>
            <ListItemText primary={'Task Lists'} />
          </StyledListItem>
        </StyledList>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="flex-end" padding="8px">
          {!open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Divider />
        </Box>
      </StyledDrawer>
    </>
  );
};
