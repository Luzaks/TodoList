import {favProject, Project, ToDo} from "./templates";
import {createHeader} from './header'
require('./css/main.css');

const bodycontainer = document.getElementsByTagName('body')[0];
bodycontainer.appendChild(createHeader());