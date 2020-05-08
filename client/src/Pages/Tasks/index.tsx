import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

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

  // const [dropPermittedLists, setDropPermissions] = useState<ActivityStatus[]>([]);
  //У меня проблемы с типами, я не могу с getDropPermissions вернуть именно так, чтобы ts понимал, что я возвращаю массив enum values
  const [dropPermittedLists, setDropPermissions] = useState<any>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const onDragEnd = (props) => {
    const { destination, draggableId } = props;
    if (destination) {
      dragEnd(draggableId, parseInt(destination.droppableId), 10);
    }
    setIsDragging(false);
  };

  const onDragStart = (props) => {
    const { droppableId } = props.source;
    setIsDragging(true);
    setDropPermissions(getAllowedStatuses(userType, parseInt(droppableId, 10)));
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
                canDrop={dropPermittedLists.includes(parseInt(status))}
                isDragging={isDragging}
                openDialog={() => setDialogOpen(true)}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
      {/*<CustomizedDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} />*/}
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
