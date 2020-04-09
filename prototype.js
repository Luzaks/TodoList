// eslint-disable-next-line import/prefer-default-export
export class todoItem {
  constructor(title, description, dueDate, priority, isproject, belongsTo) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isproject = isproject;
    this.belongsTo = belongsTo;
  }
}