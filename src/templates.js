const favProject = () => {
    const favorite = 'fav';
    return {
        favoritism: () => console.log(favorite)
    }
};

const Project = function (projectName) {
    const project = {};
    project.projectName = projectName;
    project.projectPreference = function (projectPreference) {
        switch(projectPreference) {
            case 1:
                return favProject();
                break;
            case 2:
                return 'So boring!';
                break;
        }
    };
    return project;
};

const ToDo = function (todoName, description, dueDate) {
    const todo = {};
    todo.todoname = todoName;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.completedStatus = function (completedStatus) {
        return completedStatus;
    };
    todo.priority = function (priority) {
        return priority;
    };
    return todo;
};

export {
    favProject,
    Project,
    ToDo
}

/*Experimenting with functions*/

const one = Project("First Test");
one.projectPreference(1);
console.log(one, one.projectPreference());

const oneTodo = ToDo('working', 'not sure', 'something', 'checked', 'something');
console.log(oneTodo, oneTodo.completedStatus('checked'), oneTodo.priority('red'));

/*Coupling functions*/

const faviProject = favProject();
faviProject.favoritism();

const united = Object.assign(Project('Second Test'), ToDo('works?'));
console.log(united, united.priority('red'));