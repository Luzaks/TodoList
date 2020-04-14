// eslint-disable-next-line import/no-cycle
import * as localStorage from './localStorage';
import {listHome} from "../../restaurant-page/src/header";

// eslint-disable-next-line import/no-mutable-exports
export let currentProject;

let clickBlocker = '';

const getElem = (elementId) => {
  return document.getElementById(elementId)
};

const getElemValue = (elemId) => {
  return getElem(elemId).value;
};

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
  clickBlocker.innerHTML = `
  <div class="card">
        <div class="card-body flex-column">
            <h6 class="card-title">Edit project</h6>
            <input type="text" name="name" id="projectName" value="${selectedID.name}" class="float-right">
            <label for="name">Name</label>
            <button type="button" id="actionButton" class="btn btn-info btn-sm float-right">Edit</button>
          </div>
    </div>
  `;
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
  clickBlocker.innerHTML = `
  <div class="card createTask">
  <div class="card-body flex-column">
      <h6 class="card-title">Add a Task</h6>
      <input type="text" id="taskName" name="name" value="Title" class="float-right">
      <label for="name">Name</label>
      <input type="date" id="taskDate" name="date" value="2020-01-01" class="float-right">
      <label for="date">Due Date</label>
      <select id="priority" class="float-right" name="priority">
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
      </select>
      <label for="priority">Priority</label>
      <textarea name="description" id="descriptionTask" placeholder="Write a description here is needed"></textarea>
      <button type="button" id="createTaskButtonAction" class="btn btn-info btn-sm float-bt">Create</button>
    </div>
  </div>
  `;

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

  clickBlocker.innerHTML = `
  <div class="card">
        <div class="card-body flex-column">
            <h6 class="card-title">Add a Project</h6>
            <input type="text" name="name" id="projectName" value="My new project" class="float-right">
            <label for="name">Name</label>
            <button type="button" id="actionButton" class="btn btn-info btn-sm float-right">Create</button>
          </div>
    </div>
  `;
  getElem('actionButton').addEventListener('click', createProject.bind(this), false);
};

export const openEditTask = (id) =>{
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
  clickBlocker.innerHTML = `
  <div class="card createTask">
  <div class="card-body flex-column">
      <h6 class="card-title">Task Details</h6>
      <input type="text" id="taskName" name="name" value="${task.title}" class="float-right">
      <label for="name">Name</label>
      <input type="date" id="taskDate" name="date" value="${task.dueDate.toString()}" class="float-right">
      <label for="date">Due Date</label>
      <select id="priority" class="float-right" name="priority">
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
          <option value="Finished" selected="selected">Finished</option>
      </select>
      <label for="priority">Priority</label>
      <textarea name="description" id="descriptionTask">${task.description}</textarea>
      <button type="button" id="editTaskButtonAction" class="btn btn-info btn-sm float-bt">Submit</button>
    </div>
  </div>
  `;

  getElem('editTaskButtonAction').addEventListener('click', confirmTaskEdit.bind(this, task, taskParent));
};

const confirmTaskEdit = (element, parent) => {
  const taskTitle = getElemValue('taskName');
  const taskDate = getElemValue('taskDate');
  const taskPrio = getElemValue('priority');
  const description = getElemValue('descriptionTask');

  closeModals();
  localStorage.editTask(element, parent, taskTitle, description, taskDate, taskPrio);
};