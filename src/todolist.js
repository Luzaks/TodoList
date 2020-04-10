import { todoItem } from './todoItem';

// eslint-disable-next-line import/prefer-default-export
export class todoList extends todoItem {
  super(members) {
    this.members = members;
  }
}