import React from 'react';
import { connect } from 'react-redux';

import { ActivityStatus, IActivity } from 'common/index';
import TaskList from '../../components/TaskList';
import { AppState } from '../../reducers/rootReducer';
import styles from './index.scss';
import Loading from '../../components/Loading';
import selectors from '../../selectors';
import Error from '../../components/Error';


interface ITasksProps {
  lists: { status: string; list: IActivity[] }[];
  loaded: boolean
  pending: boolean;
  error: boolean;
  noData: boolean | null;
}

const Tasks: React.FC<ITasksProps> = ({ lists, loaded, pending, error, noData }) => {
  if (pending) {
    return <Loading />;
  }
  if (error) {
    return <Error errorMessage={'An error occupied while loading component'} errorCode={error} />;
  }

  return (
    <div className={styles.workSpace}>
      <h2>Tasks</h2>
      <div className={styles.tasksContainer}>
        {lists.map(({status, list}, index) => (
          <TaskList key={index} status={status} tasks={list}/>
        ))}
      </div>
    </div>
  );
};

export default connect((state: AppState) => ({
  lists: selectors.activities.getLists(state),
  ...state.activities.fetchAsync,
  noData: selectors.activities.isEmpty(state),
}))(Tasks);
