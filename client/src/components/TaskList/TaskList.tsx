import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { IActivity } from 'common/index';
import { StyledContainer, StyledAddNewCardContainer, StyledAddButton } from './TaskList.styles';

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

export const TaskList: React.FC<TaskListInterface> = ({
  status,
  statusOnly,
  tasks,
  canDrop,
  isDragging,
  onOpenDialog,
  onOpenHistory,
}) => {
  return (
    <StyledContainer $isDropEnabled={canDrop} $isDragging={isDragging}>
      <StyledAddNewCardContainer>
        <h2>{TITLE_STATUS_MAP[status]}</h2>
        {TITLE_STATUS_MAP[status] === TITLE_STATUS_MAP[0] ? (
          <StyledAddButton onClick={() => onOpenDialog(FormType.create)}>New</StyledAddButton>
        ) : null}
      </StyledAddNewCardContainer>
      <Droppable droppableId={status} isDropDisabled={!canDrop}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
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
    </StyledContainer>
  );
};