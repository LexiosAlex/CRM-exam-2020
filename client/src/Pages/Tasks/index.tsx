import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';

import { ActivityStatus, EmployeeType, IActivity } from 'common/index';
import { getAllowedStatuses } from 'common/activityWorkflow';
import { ActivityLists } from '../../interfaces/common';
import TaskList from '../../components/TaskList';
import { AppState } from '../../reducers/rootReducer';
import Loading from '../../components/Loading';
import selectors from '../../selectors';
import Error from '../../components/Error';
import { dragEnd } from '../../actions/activities';

import styles from './index.scss';

interface ITasksProps {
  lists: ActivityLists;
  loaded: boolean;
  pending: boolean;
  error: string;
  userType: EmployeeType;
  dragEnd: Function;
}

const Tasks: React.FC<ITasksProps> = ({ lists, loaded, pending, error, userType, dragEnd }) => {
  if (pending) {
    return <Loading />;
  }
  if (error) {
    return <Error errorMessage={'An error occupied while loading component'} errorCode={error} />;
  }

  const [allowedStatuses, setAllowedStatuses] = useState<ActivityStatus[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDragEnd = ({ destination, draggableId }: DropResult) => {
    if (destination) {
      dragEnd(draggableId, parseInt(destination.droppableId), 10);
    }
    setIsDragging(false);
  };

  const onDragStart = ({ source: { droppableId } }: DragStart) => {
    setIsDragging(true);
    setAllowedStatuses(getAllowedStatuses(userType, parseInt(droppableId, 10)));
  };

  const onDragUpdate = (props) => {
    // console.log(props);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
        <div className={styles.workSpace}>
          <h2>Tasks</h2>
          <div className={styles.tasksContainer}>
            {Object.entries(lists).map(([status, list], index) => (
              <TaskList
                key={index}
                status={status}
                tasks={list}
                canDrop={allowedStatuses.includes(parseInt(status))}
                isDragging={isDragging}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default connect(
  (state: AppState) => ({
    lists: selectors.activities.getLists(state),
    ...state.activities.fetchAsync,
    userType: state.firebase.profile.type,
  }),
  (dispatch) => ({
    dragEnd: (id: string, status: ActivityStatus) => dispatch(dragEnd(id, status)),
  })
)(Tasks);
