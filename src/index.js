import './CSS/main.css';
import './CSS/bootstrap.css';
import add from './assets/add.png';
import * as events from './events';

const createHeader = () => {
  const element = document.createElement('header');
  element.classList.add('headerContainer', 'd-flex', 'justify-content-between', 'align-items-center');
  const container = document.createElement('div');
  container.classList.add('h1HeaderContainer', 'col-lg-4', 'col-xl-3', 'col-md-4', 'col-sm-7', 'col-10', 'd-flex', 'align-items-center', 'justify-content-end');
  element.appendChild(container);
  const title = document.createElement('h1');
  title.classList.add('headerH1', 'firstSpan');
  title.innerHTML = 'dodoist ';
  container.appendChild(title);
  const span = document.createElement('span');
  span.classList.add('secondSpan');
  span.innerHTML = 'the place of your tasks';
  title.appendChild(span);

  return element;
};

const createMain = () => {
  document.body.appendChild(createHeader());
  const element = document.createElement('main');
  element.classList.add('mainTag', 'd-flex');
  const menuAside = document.createElement('aside');
  menuAside.classList.add('menuAside', 'col-xl-3', 'col-l-3', 'col-md-3', 'd-flex', 'flex-column', 'justify-content-start', 'align-items-center');
  element.appendChild(menuAside);
  const container1 = document.createElement('div');
  container1.classList.add('d-flex', 'projectActivity', 'justify-content-end');
  menuAside.appendChild(container1);
  const title = document.createElement('h2');
  title.classList.add('listProjectsH2');
  title.innerHTML = 'Projects';
  container1.appendChild(title);
  const addbutton = new Image();
  addbutton.classList.add('add-img');
  addbutton.src = add;
  addbutton.addEventListener('click', events.openCreateProject.bind(this), false);
  title.appendChild(addbutton);

  return element;
};

document.body.appendChild(createMain());