import React, { useState } from 'react';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import AddIcon from '@material-ui/icons/Add';
import TextForm from './TextForm';
import WithAuth from '../../Hocs/WithAuth';
import {ICard} from '../../interfaces/TaskLists'

interface TaskListInterface {
  title: string;
  cards: ICard[];
}


const TaskList: React.FC<TaskListInterface> = ({ title, cards}) => {
  const [isFormOpen, setOpenFormState] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {cards.map(card => (
        <TaskCard key={card.id} title={card.title} />
      ))}
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

export default WithAuth(TaskList);
