// eslint-disable-next-line import/no-cycle
import * as localStorage from './localStorage';
import * as variables from './variables';

// eslint-disable-next-line import/no-mutable-exports
export let currentProject;

let clickBlocker = '';

const getElem = (elementId) => document.getElementById(elementId);

const getElemValue = (elemId) => getElem(elemId).value;

const closeModals = () => {
  clickBlocker = getElem('clickBlock').classList.add('hidden');
};

const popUp = () => {
  clickBlocker.classList.remove('hidden');
};

const editProject = (element) => {
  const val = getElem('projectName');
  closeModals();
  localStorage.updateProject(element, val.value);
};

export const openEditProject = () => {
  clickBlocker = getElem('clickBlock');
  let selectedID;
  popUp();
  localStorage.currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === currentProject) {
      selectedID = elem;
    }
  });
  clickBlocker.innerHTML = variables.editProjectTXT(selectedID.name);
  getElem('actionButton').addEventListener('click', editProject.bind(this, selectedID.id), false);
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

export const addTask = () => {
  let selectedID;
  localStorage.currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === currentProject) {
      selectedID = elem;
    }
  });
  const name = getElemValue('taskName');
  const description = getElemValue('descriptionTask');
  const date = getElemValue('taskDate');
  const priority = getElemValue('priority');

  closeModals();
  localStorage.addTaskToObject(selectedID, name, description, date, priority);
};

export const deleteTask = (id) => {
  localStorage.currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === currentProject) {
      localStorage.deleteTask(elem, id);
    }
  });
};

export const openAddTaskWindow = () => {
  clickBlocker = getElem('clickBlock');
  popUp();
  clickBlocker.innerHTML = variables.modalsHTML;

  getElem('createTaskButtonAction').addEventListener('click', addTask.bind(this), false);
};

export const createProject = () => {
  const val = getElem('projectName');
  closeModals();
  localStorage.createProject(val.value);
  val.value = '';
};

export const deleteProject = () => {
  const projectToDelete = currentProject;
  currentProject = null;
  localStorage.removeProject(projectToDelete);
};


export const openCreateProject = () => {
  clickBlocker = getElem('clickBlock');
  popUp();

  clickBlocker.innerHTML = variables.modalsCreateHTML;
  getElem('actionButton').addEventListener('click', createProject.bind(this), false);
};

const confirmTaskEdit = (element, parent) => {
  const taskTitle = getElemValue('taskName');
  const taskDate = getElemValue('taskDate');
  const taskPrio = getElemValue('priority');
  const description = getElemValue('descriptionTask');

  closeModals();
  localStorage.editTask(element, parent, taskTitle, description, taskDate, taskPrio);
};

export const openEditTask = (id) => {
  let taskParent;
  let task;
  localStorage.currentProjects.forEach(elem => {
    if (`projectItem${elem.id}` === currentProject) {
      taskParent = elem;
      elem.members.forEach(element => {
        if (`editTaskB${element.id}` === id) {
          task = element;
        }
      });
    }
  });


  clickBlocker = getElem('clickBlock');
  popUp();
  // eslint-disable-next-line max-len
  clickBlocker.innerHTML = variables.editTaskTXT(task.title, task.dueDate.toString(), task.description);

  getElem('editTaskButtonAction').addEventListener('click', confirmTaskEdit.bind(this, task, taskParent));
};