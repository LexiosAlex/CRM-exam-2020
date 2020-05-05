import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styles from './index.scss';
import { ActivityType } from 'common/index';
import { TITLE_TYPE_MAP } from '../../utils/activities';

interface ITaskCardProps {
  type: ActivityType;
  address: string;
  openDialog: Function;
}

const TaskCard: React.FC<ITaskCardProps> = ({ type, address, openDialog }) => {
  return (
    <Card className={styles.cardContainer}>
      <CardContent classes={{ root: styles.cardContent }}>
        <Typography component="h3" gutterBottom={true} className={styles.taskType}>
          {TITLE_TYPE_MAP[type]}
        </Typography>
        <Typography component="h4" gutterBottom={true} className={styles.address}>
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
