import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';

import { ActivityType } from 'common/index';
import { TITLE_TYPE_MAP } from '../../utils/activities';

import styles from './index.scss';

interface ITaskCardProps {
  id: string;
  index: number;
  type: ActivityType;
  address: string;
  openDialog: Function;
}

const TaskCard: React.FC<ITaskCardProps> = ({ type, address, id, index, openDialog }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
