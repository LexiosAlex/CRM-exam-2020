import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Droppable } from 'react-beautiful-dnd';

import { IActivity } from 'common/index';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import { TITLE_STATUS_MAP } from '../../utils/activities';

interface TaskListInterface {
  status: string;
  tasks: IActivity[];
  canDrop: boolean;
  isDragging: boolean;
  openDialog: Function;
}

const TaskList: React.FC<TaskListInterface> = ({
  status,
  tasks,
  canDrop,
  openDialog,
  isDragging,
}) => {
  return (
    <div
      className={`${styles.container} ${
        isDragging && (!canDrop ? styles.dropDisabled : styles.dropEnabled)
      }`}
    >
      <h2>{TITLE_STATUS_MAP[status]}</h2>
      <Droppable droppableId={status} isDropDisabled={!canDrop}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.length ? (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  type={task.type}
                  address={task.address}
                  id={task.id}
                  index={index}
                  openDialog={openDialog}
                />
              ))
            ) : (
              <p>There are no cards available new!</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
