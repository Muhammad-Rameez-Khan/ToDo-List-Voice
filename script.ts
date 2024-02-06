// Define Task interface
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

// Initialize tasks array
let tasks: Task[] = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList')!;
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask(text: string) {
    const newTask: Task = {
        id: tasks.length + 1,
        text,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
}

// Function to delete a task
function deleteTask(id: number) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Add event listener for the Add Task button
const addTaskButton = document.getElementById('addTaskButton')!;
addTaskButton.addEventListener('click', () => {
    const taskInput = <HTMLInputElement>document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});
