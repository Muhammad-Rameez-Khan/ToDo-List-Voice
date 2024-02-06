// Initialize tasks array
var tasks = [];
// Function to render tasks
function renderTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        taskItem.innerHTML = "\n            <input type=\"checkbox\" ".concat(task.completed ? 'checked' : '', ">\n            <span>").concat(task.text, "</span>\n            <button onclick=\"deleteTask(").concat(task.id, ")\">Delete</button>\n        ");
        taskList.appendChild(taskItem);
    });
}
// Function to add a new task
function addTask(text) {
    var newTask = {
        id: tasks.length + 1,
        text: text,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
}
// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    renderTasks();
}
// Add event listener for the Add Task button
var addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', function () {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});
