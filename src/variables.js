/* eslint-disable no-useless-concat */
// eslint-disable-next-line import/prefer-default-export
export const welcometext = '<br>' + '<br>' + '<br>' + ' ٩(◕‿◕｡)۶  --  You can find the listed projects, and add them, in the left side of the page. ' + '<br>'
+ '<br>'
+ '(ﾉ◕ヮ◕)ﾉ  --  Once a project is selected, the add task icon is found in the right side of the page.' + '<br>'
+ '<br>'
+ 'o(∗  ❛ั ᵕ ❛ั )੭່  --  Click on it and start adding tasks!!!' + '<br>'
+ '<br>' + '(•‾⌣‾•)و ̑̑  --  '
+ 'Remember, you can edit tasks at anytime you want.' + '<br>'
+ '<br>' + '(`⌒´メ)  -- And kill projects or tasks with a click on the remove button.' + '<br>'
+ '<br>'
+ '(๑˃ᴗ˂)ﻭ  --  Lets start!!';

export const modalsHTML = `
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

export const modalsCreateHTML = `
<div class="card">
      <div class="card-body flex-column">
          <h6 class="card-title">Add a Project</h6>
          <input type="text" name="name" id="projectName" value="My new project" class="float-right">
          <label for="name">Name</label>
          <button type="button" id="actionButton" class="btn btn-info btn-sm float-right">Create</button>
        </div>
  </div>
`;

export const messageEmpty = '<br>' + '<br>'
+ 'Your daily shedule is waiting!!'
+ '<br>' + '<br>'
+ '─=≡Σ((( つ＞＜)つ' + '<br>';

export const editProjectTXT = (idSelected) => {
  const innerTxt = `
    <div class="card">
          <div class="card-body flex-column">
              <h6 class="card-title">Edit project</h6>
              <input type="text" name="name" id="projectName" value="${idSelected}" class="float-right">
              <label for="name">Name</label>
              <button type="button" id="actionButton" class="btn btn-info btn-sm float-right">Edit</button>
            </div>
      </div>
    `;

  return innerTxt;
};

export const editTaskTXT = (title, date, description) => {
  const innerTxt = `
    <div class="card createTask">
    <div class="card-body flex-column">
        <h6 class="card-title">Task Details</h6>
        <input type="text" id="taskName" name="name" value="${title}" class="float-right">
        <label for="name">Name</label>
        <input type="date" id="taskDate" name="date" value="${date}" class="float-right">
        <label for="date">Due Date</label>
        <select id="priority" class="float-right" name="priority">
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
            <option value="Finished" selected="selected">Finished</option>
        </select>
        <label for="priority">Priority</label>
        <textarea name="description" id="descriptionTask">${description}</textarea>
        <button type="button" id="editTaskButtonAction" class="btn btn-info btn-sm float-bt">Submit</button>
      </div>
    </div>
    `;

  return innerTxt;
};

// eslint-disable-next-line max-len
export const contetTaskinfo = (title, id, png, color, priority, message, description, deletepng) => {
  const innerTxt = `<div>
        <h6>${title} <img class="add-img2 deleteimgT" name="editTaskB" id="editTaskB${id}" alt="add-icon" src="${png}" /></h6>
        <p class="details">${color}&nbsp;<span>Priority: </span> ${priority} ${message}</p>
        <medium class="descriptionTask">${description}</medium>

        <img class="add-img float-right deleteimg" name="deleteProjectTask" id="deleteProjectTask${id}" alt="add-icon" src="${deletepng}" />
        <hr />
        </div>`;

  return innerTxt;
};

export const itemListTXT = (id, name) => {
  const innerTxt = `
  <li class="projectItemContainer">
  <div class="projectItem" id="projectItem${id}">${name}</div>
  </li>`;

  return innerTxt;
};

export const taskListTXT = (name, edit, deleteButton, add) => {
  const innerTxt = ` 
  <h5>${name} <img class="add-img2 deleteimgT" id="openEditProject" alt="add-icon" src="${edit}" /> <img class="add-img deleteimgT" id="deleteProjectButton" alt="add-icon" src="${deleteButton}" /></h5>
          
  <div class="d-flex projectActivity justify-content-end">
      <p class="listProjectsH2">
          Add Task
      </p>
      <img class="add-img" id="addTaskButton" alt="add-icon" src="${add}" />
  </div>
  <hr />`;

  return innerTxt;
};