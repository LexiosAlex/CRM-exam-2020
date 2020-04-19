import {IList} from "../interfaces/TaskLists";

const initialState: IList[] = [{
  title: 'Ready for assign',
  cards: [
    {
      id: 'string1',
      title: 'task 1',
      description: 'some random text 1',
    },
    {
      id: 'string2',
      title: 'task 2',
      description: 'some random text agdsgasdg sag 2',
    },
  ],
},
  {
    title: 'assigned',
    cards: [
      {
        id: 'string1',
        title: 'task 1',
        description: 'some random text 1',
      },
      {
        id: 'string2',
        title: 'task 2',
        description: 'some random text agdsgasdg sag 2',
      },
    ],
  }];

const taskListsReducer = (state: IList[] = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default taskListsReducer;
