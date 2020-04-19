import React, { useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { REFS } from '../../utils/refs';
import TaskList from '../../components/TaskList';
import { connect } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';
import { IList } from '../../interfaces/TaskLists';
import styles from './index.scss';

interface ITasksProps {
  taskLists: IList[];
}

const Tasks: React.FC<ITasksProps> = ({ taskLists }) => {
  return (
    <>
      <h2>Task-lists</h2>
      <div className={styles.tasksContainer}>
        {taskLists.map((list, index) => (
          <TaskList key={index} title={list.title} cards={list.cards} />
        ))}
      </div>
    </>
  );
};

export default connect((state: AppState) => ({
  taskLists: state.taskLists,
}))(Tasks);
