// eslint-disable-next-line import/no-cycle
import * as localStorage from './localStorage';

// eslint-disable-next-line import/no-mutable-exports
export let currentProject;

const closeModals = () => {
  const clickBlocker = document.getElementById('clickBlock');
  clickBlocker.classList.add('hidden');
  const cards = document.getElementsByClassName('card');
  Array.prototype.forEach.call(cards, (element) => {
    element.classList.add('hidden');
  });
};

export const editProject = (id) => {
  
};

export const selectProject = (id) => {
  currentProject = id;
  localStorage.createTaskListContents();
  const projectButtons = document.getElementsByClassName('projectItem');
  Array.prototype.forEach.call(projectButtons, (element) => {
    // eslint-disable-next-line no-unused-expressions
    element.id === id ? element.classList.add('selectedItem') : element.classList.remove('selectedItem');
  });
};

export const addEvent = () => {
  // something
};

export const deleteEvent = () => {
  // something
};

export const assignProject = () => {
  // something
};

export const createProject = () => {
  const val = document.getElementById('projectName');
  localStorage.createProject(val.value);
  val.value = '';
  closeModals();
};

export const deleteProject = () => {
  const projectToDelete = currentProject;
  currentProject = null;
  localStorage.removeProject(projectToDelete);
};

export const changePriority = () => {
  // something
};

export const openCreateProject = () => {
  const clickBlocker = document.getElementById('clickBlock');
  clickBlocker.classList.remove('hidden');
  const cards = document.getElementsByClassName('card');
  Array.prototype.forEach.call(cards, (element) => {
    // eslint-disable-next-line no-unused-expressions
    element.id === 'projectCard' ? element.classList.remove('hidden') : element.classList.add('hidden');
  });
};