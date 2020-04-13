import { TodoList } from './todolist';
// eslint-disable-next-line import/no-cycle
import * as events from './events';
import edit from './assets/edit.png';
import deleteButton from './assets/delete.png';
import add from './assets/add.png';

// eslint-disable-next-line import/no-mutable-exports
export let currentProjects = [];

// eslint-disable-next-line import/prefer-default-export
export const initializeStorage = () => {
  if (JSON.parse(localStorage.getItem('TodoProjects')) === null) {
    currentProjects.push(new TodoList(0, 'Exaple Project', []));
    localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
  } else {
    currentProjects = JSON.parse(localStorage.getItem('TodoProjects'));
  }
};

export const createProjectListItems = () => {
  const itemlist = document.getElementById('projectsContainer');
  let itemlistInfo = '';
  currentProjects.forEach(proj => {
    itemlistInfo += `
    <li class="projectItemContainer">
    <div class="projectItem" id="projectItem${proj.id}">${proj.name}</div>
    </li>`;
  });
  itemlist.innerHTML = itemlistInfo;
  const projectItems = document.getElementsByClassName('projectItem');
  Array.prototype.forEach.call(projectItems, (element) => {
    element.addEventListener('click', events.selectProject.bind(this, element.id), false);
  });
};

export const createTaskListContents = () => {
  let selectedID;
  if (events.currentProject !== null) {
    currentProjects.forEach(elem => {
      if (`projectItem${elem.id}` === events.currentProject) {
        selectedID = elem;
      }
    });
    const contentInfo = ` 
    <h5>${selectedID.name} <img class="add-img2 deleteimgT" alt="add-icon" src="${edit}" /> <img class="add-img deleteimgT" id="deleteProjectButton" alt="add-icon" src="${deleteButton}" /></h5>
            
    <div class="d-flex projectActivity justify-content-end">
        <p class="listProjectsH2">
            Add Task
        </p>
        <img class="add-img" alt="add-icon" src="${add}" />
    </div>
    <hr />`;
    document.getElementById('projectInfoContainer').innerHTML = contentInfo;
    document.getElementById('deleteProjectButton').addEventListener('click', events.deleteProject.bind(this), false);
  }
  else {
    document.getElementById('projectInfoContainer').innerHTML = 'Welcome! please select or create a project to start adding tasks!';
  }
};

export const removeProject = (id) => {
  currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === id) {
      currentProjects.splice(currentProjects.indexOf(elem), 1);
    }
  });
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
  createProjectListItems();
  createTaskListContents();
};

export const createProject = (name) => {
  if (name !== '') {
    const item = new TodoList(currentProjects.length === 0
      ? 0
      : Math.max(...currentProjects.map((proj) => proj.id)) + 1, name, []);
    currentProjects.push(item);
    localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
    createProjectListItems();
  }
};