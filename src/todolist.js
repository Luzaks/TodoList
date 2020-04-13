// eslint-disable-next-line import/prefer-default-export
export class TodoList {
  constructor(id, name, members) {
    this.id = id;
    this.name = name;
    this.members = members;
  }

  static addMember(member) {
    this.members.push(member);
  }

  static changeName(newName) {
    this.name = newName;
  }
}
