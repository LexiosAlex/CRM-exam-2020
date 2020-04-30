import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useFirebase } from 'react-redux-firebase';

import WithAuth from '../../Hocs/WithAuth';
import { EmployeeType } from 'common/index';

import styles from './index.scss';
import logo from '../../media/logo/spiral.svg';

const AppHeader: React.FC = (props: any) => {
  const { email, name, type } = props.profile;
  const firebase = useFirebase();

  const getUserType = (type: EmployeeType): string => {
    switch (type) {
      case EmployeeType.Admin:
        return 'Admin';
      case EmployeeType.Operator:
        return 'Operator';
      case EmployeeType.Volunteer:
        return 'Volunteer';
      default:
        return '';
    }
  };

  const logOutHandler = () => firebase.logout();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt={'site logo'} />
        <p>osiris</p>
      </div>
      <div className={styles.account}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{`Name: ${name}`}</p>
          <div className={styles.userInfoContainer}>
            <p>{`Role: ${getUserType(type)}`}</p>
            <p>{`Email: ${email}`}</p>
          </div>
        </div>
        <div className={styles.logOut}>
          <IconButton onClick={logOutHandler}>
            <ExitToAppIcon>logOut</ExitToAppIcon>
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default WithAuth(AppHeader);
