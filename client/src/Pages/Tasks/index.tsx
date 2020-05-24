import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';

import { ActivityStatus, EmployeeType, IActivity } from 'common/index';
import { ActivityLists } from '../../interfaces/common';
import TaskList from '../../components/TaskList';
import { AppState } from '../../reducers/rootReducer';
import Loading from '../../components/Loading';
import selectors from '../../selectors';
import Error from '../../components/Error';
import { dragCancel, dragEnd, dragStart } from '../../actions/activity';
import Editor from '../../components/Editor';
import { FormType } from '../../components/Editor/common';

import styles from './index.scss';

interface ITasksProps {
  lists: ActivityLists;
  loaded: boolean;
  pending: boolean;
  error: string;
  userType: EmployeeType;
  isDragging: boolean;
  allowedStatuses: ActivityStatus[];
  dragStart: Function;
  dragCancel: Function;
  dragEnd: Function;
}

const Tasks: React.FC<ITasksProps> = ({
  lists,
  loaded,
  pending,
  error,
  userType,
  isDragging,
  allowedStatuses,
  dragStart,
  dragCancel,
  dragEnd,
}) => {
  if (pending) {
    return <Loading />;
  }
  if (error) {
    return <Error errorMessage={'An error occupied while loading component'} errorCode={error} />;
  }

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [formType, setFormType] = useState<number>(FormType.create);
  const [editorActivity, setEditorActivity] = useState<IActivity | null>(null);
  const statusOnly = userType === EmployeeType.Volunteer;

  const onDragEnd = ({ destination, draggableId }: DropResult) => {
    if (destination) {
      dragEnd(draggableId, parseInt(destination.droppableId, 10));
    } else {
      dragCancel(draggableId);
    }
  };

  const onDragStart = ({ source: { droppableId } }: DragStart) => {
    dragStart(userType, parseInt(droppableId, 10));
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
                statusOnly={statusOnly}
                tasks={list}
                canDrop={allowedStatuses.includes(parseInt(status))}
                isDragging={isDragging}
                onOpenDialog={(type: FormType, activity: IActivity) => {
                  type === FormType.edit ||
                    (type === FormType.statusOnly && setEditorActivity(activity));
                  setFormType(type);
                  setDialogOpened(true);
                }}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
      {dialogOpened ? (
        <Editor
          formType={formType}
          open={dialogOpened}
          onClose={() => {
            setEditorActivity(null);
            setDialogOpened(false);
          }}
          activity={editorActivity}
        />
      ) : null}
    </>
  );
};

export default connect(
  (state: AppState) => ({
    lists: selectors.activities.getLists(state),
    ...state.activities.fetchAsync,
    ...state.users.fetchAsync,
    userType: state.firebase.profile.type,
    isDragging: selectors.activities.getIsDragging(state),
    allowedStatuses: selectors.activities.getAllowedStatuses(state),
  }),
  (dispatch) => ({
    dragStart: (type: EmployeeType, status: ActivityStatus) => dispatch(dragStart(type, status)),
    dragCancel: (id: string) => dispatch(dragCancel(id)),
    dragEnd: (id: string, status: ActivityStatus) => dispatch(dragEnd(id, status)),
  })
)(Tasks);
