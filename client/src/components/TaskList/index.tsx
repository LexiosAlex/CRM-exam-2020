import React, { useState } from 'react';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import { IList } from '../../interfaces/TaskLists';
import AddIcon from '@material-ui/icons/Add';
import TextForm from "./TextForm";

const TaskList: React.FC<IList> = ({ title, cards }) => {
  const [isFormOpen, setOpenFormState] = useState<boolean>(false);

  return (
    // <div className="column-wrapper">
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
      {/*<ul className="task-list">*/}
      {/*  <li></li>*/}
      {/*</ul>*/}
    </div>
    // </div>
  );
};

export default TaskList;
