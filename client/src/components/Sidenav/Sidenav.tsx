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
import { Link } from 'react-router-dom';

import { StyledDrawer, StyledListItem, StyledList } from './Sidenav.style';
import * as navPaths from '../../utils/router';
import { Box } from '@material-ui/core';

//TODO: refactor this, get out of display none
export const Sidenav: React.FC = () => {
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
          <StyledListItem button>
            <Link to={navPaths.STATS}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
            </Link>
            {!open ?? <ListItemText primary={'Dashboard'} />}
          </StyledListItem>
          <StyledListItem button>
            <Link to={navPaths.USERS}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
            </Link>
            {!open ?? <ListItemText primary={'Users'} />}
          </StyledListItem>
          <StyledListItem button>
            <Link to={navPaths.TASKS}>
              <ListItemIcon>
                <ViewColumnIcon />
              </ListItemIcon>
            </Link>
            {!open ?? <ListItemText primary={'Task Lists'} />}
          </StyledListItem>
        </StyledList>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="flex-end" padding="8px">
          {!open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Divider />
        </Box>
      </StyledDrawer>
    </>
  );
};
