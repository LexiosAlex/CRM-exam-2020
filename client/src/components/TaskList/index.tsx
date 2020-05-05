import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Droppable } from 'react-beautiful-dnd';

import { IActivity } from 'common/index';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import TextForm from './TextForm';
import { TITLE_STATUS_MAP } from '../../utils/activities';

interface TaskListInterface {
  status: string;
  tasks: IActivity[];
  openDialog: Function;
}

const TaskList: React.FC<TaskListInterface> = ({ status, tasks, openDialog }) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={styles.container}>
          <h2>{TITLE_STATUS_MAP[status]}</h2>
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
  );
};

export default TaskList;
