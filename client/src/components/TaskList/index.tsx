import React from 'react';
import styles from './index.scss';
import TaskCard from '../TaskCard';
import { IList } from '../../interfaces/TaskLists';

const TaskList: React.FC<IList> = ({ title, cards }) => {
  return (
    // <div className="column-wrapper">
    <div className={styles.container}>
      <h2>{title}</h2>
      {cards.map(card => (
        <TaskCard key={card.id} title={card.title} description={card.description} />
      ))}

      {/*<ul className="task-list">*/}
      {/*  <li></li>*/}
      {/*</ul>*/}
    </div>
    // </div>
  );
};

export default TaskList;
