import './todoItem';
import './todolist';

const emptyStorageUnit = [];

// eslint-disable-next-line import/prefer-default-export
export const initializeStorage = () => {
  if (localStorage.getItem('TodoProjects') === null) {
    localStorage.setItem('TodoProjects', JSON.stringify(emptyStorageUnit));
  }
};