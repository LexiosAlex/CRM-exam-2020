import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import styles from './index.scss';

interface ITaskCardProps {
  title: string;
  description: string;
}

const TaskCard: React.FC<ITaskCardProps> = ({ title, description }) => {
  return (
    <Card className={styles.cardContainer}>
      <CardContent>
        <h4>{title}</h4>
        <Typography gutterBottom={true}>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
