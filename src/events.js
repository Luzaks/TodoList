// eslint-disable-next-line import/no-cycle
import * as localStorage from './localStorage';

// eslint-disable-next-line import/no-mutable-exports
export let currentProject;

const closeModals = () => {
  const clickBlocker = document.getElementById('clickBlock');
  clickBlocker.classList.add('hidden');
};

const editProject = (element) => {
  const val = document.getElementById('projectName');
  closeModals();
  localStorage.updateProject(element, val.value);
};

export const openEditProject = () => {
  const clickBlocker = document.getElementById('clickBlock');
  let selectedID;
  clickBlocker.classList.remove('hidden');
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
  document.getElementById('actionButton').addEventListener('click', editProject.bind(this, selectedID.id), false);
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
  document.getElementById('actionButton').addEventListener('click', createProject.bind(this), false);
};