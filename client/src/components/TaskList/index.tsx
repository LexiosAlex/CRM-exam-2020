import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Droppable } from 'react-beautiful-dnd';

import { IActivity } from 'common/index';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import { TITLE_STATUS_MAP } from '../../utils/activities';
import { IconButton } from '@material-ui/core';
import { FormType } from '../Editor/common';

interface TaskListInterface {
  status: string;
  tasks: IActivity[];
  canDrop: boolean;
  isDragging: boolean;
  onOpenDialog: Function;
}

const TaskList: React.FC<TaskListInterface> = ({
  status,
  tasks,
  canDrop,
  isDragging,
  onOpenDialog,
}) => {
  return (
    <div
      className={`${styles.container} ${
        isDragging && (!canDrop ? styles.dropDisabled : styles.dropEnabled)
      }`}
    >
      <div className={styles.addNewCardContainer}>
        <h2>{TITLE_STATUS_MAP[status]}</h2>
        {TITLE_STATUS_MAP[status] === TITLE_STATUS_MAP[0] ? (
          <button onClick={() => onOpenDialog(FormType.newForm)} className={styles.addButton}>
            New
          </button>
        ) : null}
      </div>
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
                  onOpenDialog={() => onOpenDialog(FormType.editForm, task)}
                />
              ))
            ) : (
              <p>There are no cards available</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
