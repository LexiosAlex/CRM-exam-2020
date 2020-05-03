import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';

import { IActivity } from 'common/index';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import TextForm from './TextForm';
import { TITLE_STATUS_MAP } from '../../utils/activities';

interface TaskListInterface {
  status: string;
  tasks: IActivity[];
}

const TaskList: React.FC<TaskListInterface> = ({ status, tasks }) => {
  const [isFormOpen, setOpenFormState] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <h2>{TITLE_STATUS_MAP[status]}</h2>
      {tasks.length ? (
        tasks.map((task) => <TaskCard key={task.id} type={task.type} address={task.address} />)
      ) : (
        <p>There are no cards available new!</p>
      )}
      {isFormOpen ? (
        <TextForm
          onClose={() => {
            setOpenFormState(false);
          }}
        />
      ) : (
        <div className={styles.addButtonContainer} onClick={() => setOpenFormState(true)}>
          <AddIcon>add</AddIcon>
          <p>create a new task</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
