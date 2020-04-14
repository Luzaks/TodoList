import { TodoList } from './todolist';
// eslint-disable-next-line import/no-cycle
import * as events from './events';
import edit from './assets/icons8-edit-24.png';
import deleteButton from './assets/icons8-delete-64.png';
import add from './assets/add.png';
import { TodoItem } from './todoItem';

// eslint-disable-next-line import/no-mutable-exports
export let currentProjects = [];

const getId = (elemId) => {
  return document.getElementById(elemId);
};

// eslint-disable-next-line import/prefer-default-export
export const initializeStorage = () => {
  if (JSON.parse(localStorage.getItem('TodoProjects')) === null) {
    currentProjects.push(new TodoList(0, 'Exaple Project', []));
    localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
  } else {
    currentProjects = JSON.parse(localStorage.getItem('TodoProjects'));
  }
};

export const createProjectListItems = (keepOpen) => {
  const itemlist = getId('projectsContainer');
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

  if (keepOpen === true) {
    events.selectProject(events.currentProject);
  }
};

const getMessage = (prio, date) => {
  let val = '';
  if (prio === 'Finished') {
    val = '';
  } else {
    val = `<span class="float-right marg"> This task should be done by ${date}</span>`;
  }
  return val;
};

export const createTaskListContents = () => {
  let selectedID;
  let contentTaskInfo = '';
  let message= '';

  if (events.currentProject !== null) {
    currentProjects.forEach(elem => {
      if (`projectItem${elem.id}` === events.currentProject) {
        selectedID = elem;
      }
    });
    if (selectedID.members.length > 0) {
      selectedID.members.forEach(elem => {
        contentTaskInfo += `<div>
            <h6>${elem.title} <img class="add-img2 deleteimgT" name="editTaskB" id="editTaskB${elem.id}" alt="add-icon" src="${edit}" /></h6>
            <p class="details"><span>Priority: </span> ${elem.priority} ${getMessage(elem.priority, elem.dueDate)}</p>
            <small>${elem.description}</small>

            <img class="add-img float-right deleteimg" name="deleteProjectTask" id="deleteProjectTask${elem.id}" alt="add-icon" src="${deleteButton}" />
            <hr />
            </div>`;
      });
    }
    const contentInfo = ` 
    <h5>${selectedID.name} <img class="add-img2 deleteimgT" id="openEditProject" alt="add-icon" src="${edit}" /> <img class="add-img deleteimgT" id="deleteProjectButton" alt="add-icon" src="${deleteButton}" /></h5>
            
    <div class="d-flex projectActivity justify-content-end">
        <p class="listProjectsH2">
            Add Task
        </p>
        <img class="add-img" id="addTaskButton" alt="add-icon" src="${add}" />
    </div>
    <hr />`;
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
    getId('projectInfoContainer').innerHTML = 'Welcome! please select or create a project to start adding tasks!';
  }
};

export const removeProject = (id) => {
  currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === id) {
      currentProjects.splice(currentProjects.indexOf(elem), 1);
    }
  });
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
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
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
  createProjectListItems(true);
};

export const updateProject = (id, value) => {
  currentProjects.forEach(elem => {
    if (elem.id === id) {
      elem.name = value;
    }
  });
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
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
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
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
  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
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

  localStorage.setItem('TodoProjects', JSON.stringify(currentProjects));
  createProjectListItems(true);
  createTaskListContents();
};