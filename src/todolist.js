import { TodoItem } from './todoItem';

// eslint-disable-next-line import/prefer-default-export
export class TodoList extends TodoItem {
  constructor(members) {
    super(members, members);
    this.members = members;
  }
}
