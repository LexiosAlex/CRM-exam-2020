import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styles from './index.scss';

interface ITaskCardProps {
  title: string;
}

const TaskCard: React.FC<ITaskCardProps> = ({ title}) => {
  return (
    <Card className={styles.cardContainer}>
      <CardContent classes={{root: styles.cardContent }}>
        <Typography gutterBottom={true}>{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
