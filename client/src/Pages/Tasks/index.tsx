import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { ActivityStatus, IActivity } from 'common/index';
import TaskList from '../../components/TaskList';
import { AppState } from '../../reducers/rootReducer';
import styles from './index.scss';
import Loading from '../../components/Loading';
import selectors from '../../selectors';

interface ITasksProps {
  lists: { [key in ActivityStatus]: IActivity[] };
  loaded: boolean;
  pending: boolean;
  error: boolean;
}

const Tasks: React.FC<ITasksProps> = ({ lists, loaded, pending, error }) => {
  if (pending) {
    return <Loading />;
  }
  if (error) {
    return <p> Error </p>;
  }
  return (
    <div className={styles.workSpace}>
      <h2>Tasks</h2>
      <div className={styles.tasksContainer}>
        {Object.entries(lists).map(([status, list], index) => (
          <TaskList key={index} status={status} tasks={list} />
        ))}
      </div>
    </div>
  );
};

export default connect((state: AppState) => ({
  lists: selectors.activities.getLists(state),
  ...state.activities.fetchAsync,
}))(Tasks);
