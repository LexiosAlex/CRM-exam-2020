import React, { useEffect } from 'react';
import TaskList from '../../components/TaskList';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';
import { IList } from '../../interfaces/TaskLists';
import styles from './index.scss';
import Loading from '../../components/Loading';

interface ITasksProps {
  taskLists: IList[];
  loaded: boolean;
  pending: boolean;
  error: boolean;
}

const Tasks: React.FC<ITasksProps> = ({ taskLists, loaded, pending }) => {
  return (
    <>
      {pending ? <Loading /> : null}
      {loaded ? (
        <div className={styles.workSpace}>
          <h2>Task-lists</h2>
          <div className={styles.tasksContainer}>
            {taskLists.map((list, index) => (
              <TaskList key={index} title={list.title} cards={list.cards} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default connect((state: AppState) => {
  console.log(state);
  console.log({  taskLists: state.taskLists.taskListsState,
    ...state.taskLists.fetchActivitiesAsyncState,});

  return {
  taskLists: state.taskLists.taskListsState,
  ...state.taskLists.fetchActivitiesAsyncState,
}})(Tasks);
