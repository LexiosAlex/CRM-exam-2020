import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { IActivity } from 'common/index';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import { TITLE_STATUS_MAP } from '../../utils/activities';
import { FormType } from '../Editor/common';

interface TaskListInterface {
  status: string;
  statusOnly: boolean;
  tasks: IActivity[];
  canDrop: boolean;
  isDragging: boolean;
  onOpenDialog: Function;
  onOpenHistory: Function;
}

const TaskList: React.FC<TaskListInterface> = ({
  status,
  statusOnly,
  tasks,
  canDrop,
  isDragging,
  onOpenDialog,
  onOpenHistory,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.addNewCardContainer}>
        <h2>{TITLE_STATUS_MAP[status]}</h2>
        {TITLE_STATUS_MAP[status] === TITLE_STATUS_MAP[0] ? (
          <button onClick={() => onOpenDialog(FormType.create)} className={styles.addButton}>
            New
          </button>
        ) : null}
      </div>
      <Droppable droppableId={status} isDropDisabled={!canDrop}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${isDragging && (!canDrop ? styles.dropDisabled : styles.dropEnabled)}`}
          >
            {tasks.length ? (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  type={task.type}
                  address={task.address.description}
                  id={task.id}
                  index={index}
                  onOpenDialog={() =>
                    onOpenDialog(statusOnly ? FormType.statusOnly : FormType.edit, task)
                  }
                  onOpenHistory={() => onOpenHistory(task)}
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
