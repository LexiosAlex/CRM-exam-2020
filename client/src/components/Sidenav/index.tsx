import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import { Link } from 'react-router-dom';

import styles from './index.scss';
import * as navPaths from '../../utils/router';

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        className={`${styles.drawer} ${open ? styles.drawerOpen : styles.drawerClose}`}
      >
        <List className={`${styles.list} ${open ? styles.drawerOpen : styles.drawerClose}`}>
          <ListItem button>
            <Link className={styles.link} to={navPaths.STATS}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText className={`${!open ? styles.hide : ''}`} primary={'Dashboard'} />
            </Link>
          </ListItem>
          <ListItem button>
            <Link className={styles.link} to={navPaths.USERS}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText className={`${!open ? styles.hide : ''}`} primary={'Users'} />
            </Link>
          </ListItem>
          <ListItem button>
            <Link className={styles.link} to={navPaths.TASKS}>
              <ListItemIcon>
                <ViewColumnIcon />
              </ListItemIcon>
              <ListItemText className={`${!open ? styles.hide : ''}`} primary={'Task Lists'} />
            </Link>
          </ListItem>
        </List>
        <Divider />
        <div className={styles.toolbar}>
          <IconButton onClick={handleDrawerClose} className={`${!open ? styles.hide : ''}`}>
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={`${open ? styles.hide : ''}`}
          >
            <MenuIcon />
          </IconButton>
          <Divider />
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
