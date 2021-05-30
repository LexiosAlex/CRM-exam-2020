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
import { useTranslation } from 'react-i18next';

import { StyledDrawer, StyledListItem, StyledList } from './Sidenav.style';
import * as navPaths from '../../utils/router';
import { Box } from '@material-ui/core';

export const Sidenav: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
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
          <Link to={navPaths.STATS}>
            <StyledListItem button $isActive={pathname === navPaths.STATS}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('navigation.dashboard')} />
            </StyledListItem>
          </Link>

          <Link to={navPaths.USERS}>
            <StyledListItem button $isActive={pathname === navPaths.USERS}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={t('navigation.users')} />
            </StyledListItem>
          </Link>

          <Link to={navPaths.TASKS}>
            <StyledListItem button $isActive={pathname === navPaths.TASKS}>
              <ListItemIcon>
                <ViewColumnIcon />
              </ListItemIcon>
              <ListItemText primary={t('navigation.taskLists')} />
            </StyledListItem>
          </Link>
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
