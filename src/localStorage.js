/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-cycle
import * as events from './events';
import { TodoList } from './todolist';
import edit from './assets/icons8-edit-24.png';
import deleteButton from './assets/icons8-delete-64.png';
import add from './assets/add.png';
import { TodoItem } from './todoItem';
import * as variables from './variables';

// eslint-disable-next-line import/no-mutable-exports
export let currentProjects = [];

const getId = (elemId) => document.getElementById(elemId);

const saveData = () => {
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
};

// eslint-disable-next-line import/prefer-default-export
export const initializeStorage = () => {
  if (JSON.parse(localStorage.getItem('TodoProjects')) === null) {
    currentProjects.push(new TodoList(0, 'Exaple Project', []));
    saveData();
  } else {
    currentProjects = JSON.parse(localStorage.getItem('TodoProjects'));
  }
};

export const createProjectListItems = (keepOpen) => {
  const itemlist = getId('projectsContainer');
  let itemlistInfo = '';
  currentProjects.forEach(proj => {
    itemlistInfo += variables.itemListTXT(proj.id, proj.name);
  });
  itemlist.innerHTML = itemlistInfo;
  const projectItems = document.getElementsByClassName('projectItem');
  Array.prototype.forEach.call(projectItems, (element) => {
    element.addEventListener('click', events.selectProject.bind(this, element.id), false);
  });

  if (keepOpen === true) {
    events.selectProject(events.currentProject);
  }
};

const getMessage = (prio, date) => {
  let val = '';
  (prio === 'Finished') ? val = '' : val = `<span class="float-right marg"> 
  This task should be done by <span class="dateTask">${date}</span></span>`;
  return val;
};

const displayColors = (elemprio) => {
  let prioDiv;
  if (elemprio === 'Normal') {
    prioDiv = '<span class="normalPrio"></span>';
  } else if (elemprio === 'High') {
    prioDiv = '<span class="highPrio"></span>';
  } else if (elemprio === 'Low') {
    prioDiv = '<span class="lowPrio"></span>';
  } else if (elemprio === 'Finished') {
    prioDiv = '<span class="finishedPrio"></span>';
  }
  return prioDiv;
};

export const createTaskListContents = () => {
  let selectedID;
  let contentTaskInfo = '';

  if (events.currentProject !== null) {
    currentProjects.forEach(elem => {
      if (`projectItem${elem.id}` === events.currentProject) {
        selectedID = elem;
      }
    });
    if (selectedID.members.length > 0) {
      selectedID.members.forEach(elem => {
        contentTaskInfo += variables.contetTaskinfo(elem.title, elem.id, edit,
          displayColors(elem.priority),
          elem.priority, getMessage(elem.priority, elem.dueDate), elem.description, deleteButton);
      });
    }
    const contentInfo = variables.taskListTXT(selectedID.name, edit, deleteButton, add);
    if (contentTaskInfo === '') {
      getId('projectInfoContainer').innerHTML = contentInfo + contentTaskInfo;
    } else {
      getId('projectInfoContainer').innerHTML = contentInfo + contentTaskInfo;
    }
    getId('deleteProjectButton').addEventListener('click', events.deleteProject.bind(this), false);
    getId('openEditProject').addEventListener('click', events.openEditProject.bind(this), false);
    getId('addTaskButton').addEventListener('click', events.openAddTaskWindow.bind(this), false);
    const buttons = document.getElementsByName('deleteProjectTask');
    Array.prototype.forEach.call(buttons, (element) => {
      element.addEventListener('click', events.deleteTask.bind(this, element.id), false);
    });
    const buttonsEdit = document.getElementsByName('editTaskB');
    Array.prototype.forEach.call(buttonsEdit, (element) => {
      element.addEventListener('click', events.openEditTask.bind(this, element.id), false);
    });
  } else {
    getId('projectInfoContainer').innerHTML = variables.messageEmpty;
  }
};

export const removeProject = (id) => {
  currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === id) {
      currentProjects.splice(currentProjects.indexOf(elem), 1);
    }
  });
  saveData();
  createProjectListItems(false);
  createTaskListContents();
};

export const createProject = (name) => {
  if (name === '') {
    name = 'Untitled';
  }
  const item = new TodoList(currentProjects.length === 0
    ? 0
    : Math.max(...currentProjects.map((proj) => proj.id)) + 1, name, []);
  currentProjects.push(item);
  saveData();
  createProjectListItems(true);
};

export const updateProject = (id, value) => {
  currentProjects.forEach(elem => {
    if (elem.id === id) {
      elem.name = value;
    }
  });
  saveData();
  createProjectListItems(true);
  createTaskListContents();
};

export const addTaskToObject = (id, title, description, dueDate, priority) => {
  if (description === '') {
    description = 'No description provided';
  }
  if (title === '') {
    title = 'Untitled';
  }
  const newTask = new TodoItem(id.members.length === 0
    ? 0
    // eslint-disable-next-line max-len
    : Math.max(...id.members.map((proj) => proj.id)) + 1, title, description, dueDate, priority);
  currentProjects.forEach(elem => {
    if (id.id === elem.id) {
      elem.members.push(newTask);
    }
  });
  saveData();
  createProjectListItems(true);
  createTaskListContents();
};

export const deleteTask = (idproj, iditem) => {
  currentProjects.forEach(elem => {
    if (elem === idproj) {
      elem.members.forEach(element => {
        if (`deleteProjectTask${element.id}` === iditem) {
          elem.members.splice(elem.members.indexOf(element), 1);
        }
      });
    }
  });
  saveData();
  createProjectListItems(true);
  createTaskListContents();
};

export const editTask = (task, parent, taskTitle, description, taskDate, taskPrio) => {
  currentProjects.forEach(elem => {
    if (elem === parent) {
      elem.members.forEach(_item => {
        if (_item === task) {
          _item.title = taskTitle;
          _item.description = description;
          _item.dueDate = taskDate;
          _item.priority = taskPrio;
        }
      });
    }
  });

  saveData();
  createProjectListItems(true);
  createTaskListContents();
};