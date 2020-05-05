import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ActivityStatus, IActivity } from 'common/index';
import TaskList from '../../components/TaskList';
import { AppState } from '../../reducers/rootReducer';
import styles from './index.scss';
import Loading from '../../components/Loading';
import selectors from '../../selectors';
import Error from '../../components/Error';
import CustomizedDialog from '../../components/Editor';

interface ITasksProps {
  lists: { [key in ActivityStatus]: IActivity[] };
  loaded: boolean;
  pending: boolean;
  error: string;
}

const Tasks: React.FC<ITasksProps> = ({ lists, loaded, pending, error }) => {
  if (pending) {
    return <Loading />;
  }
  if (error) {
    return <Error errorMessage={'An error occupied while loading component'} errorCode={error} />;
  }

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.workSpace}>
        <h2>Tasks</h2>
        <div className={styles.tasksContainer}>
          {Object.entries(lists).map(([status, list], index) => (
            <TaskList
              key={index}
              status={status}
              tasks={list}
              openDialog={() => setDialogOpen(true)}
            />
          ))}
        </div>
      </div>
      <CustomizedDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default connect((state: AppState) => ({
  lists: selectors.activities.getLists(state),
  ...state.activities.fetchAsync,
}))(Tasks);
