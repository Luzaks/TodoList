import { TodoList } from './todolist';
import { TodoItem } from './todoItem';

export const currentProjects = [];

// eslint-disable-next-line import/prefer-default-export
export const initializeStorage = () => {
  if (JSON.parse(localStorage.getItem('TodoProjects')) === null) {
    currentProjects.push(new TodoList(0, 'Exaple Project', []));
    localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
  } else {
    currentProjects = JSON.parse(localStorage.getItem('TodoProjects'));
  }
};

const createProject = (name) => {
  const item = new TodoList(currentProjects.length === 0
    ? 0
    : Math.max(...currentProjects.map((proj) => proj.id)) + 1, name, []);

  return item;
};

export const createProjectListItem = (itemName) => {
  const element = document.createElement('li');
  element.classList.add('projectItemContainer');
  const content = document.createElement('div');
  content.classList.add('projectItem');
  element.appendChild(content);
  content.innerHTML = itemName;

  return element;
};