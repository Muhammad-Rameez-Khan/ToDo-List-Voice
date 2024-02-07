// Initialize tasks array with saved tasks or empty array if no tasks found
var tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
// Function to render tasks
function renderTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
        var taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        taskItem.innerHTML = "\n            <input type=\"checkbox\" ".concat(task.completed ? 'checked' : '', ">\n            <span class=\"").concat(task.completed ? 'completed' : '', "\">").concat(task.text, "</span>\n            <button onclick=\"deleteTask(").concat(task.id, ")\">Delete</button>\n        ");
        // Add event listener to checkbox
        var checkbox = taskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function () {
            task.completed = checkbox.checked;
            // Toggle completed class for text span
            if (task.completed) {
                var currentDate = new Date();
                var completionDate = currentDate.toLocaleDateString();
                var completionTime = currentDate.toLocaleTimeString();
                var completionNote = " - Completed: ".concat(completionDate, " ").concat(completionTime, " (Task Complete)");
                taskItem.querySelector('span').innerText += completionNote;
                taskItem.querySelector('span').classList.add('completed');
            }
            else {
                taskItem.querySelector('span').classList.remove('completed');
            }
            // Update tasks in local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskList.appendChild(taskItem);
    });
}
// Function to add a new task
function addTask(text) {
    var currentDate = new Date();
    var taskDate = currentDate.toLocaleDateString();
    var taskTime = currentDate.toLocaleTimeString();
    var newTask = {
        id: tasks.length + 1,
        text: "".concat(text, " - Assigned: ").concat(taskDate, " ").concat(taskTime),
        completed: false
    };
    tasks.push(newTask);
    // Update tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    // Update tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
// Function to handle voice input
function handleVoiceInput() {
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = function (event) {
        var speechToText = event.results[0][0].transcript;
        addTask(speechToText);
    };
    recognition.onspeechend = function () {
        recognition.stop();
    };
    recognition.onerror = function (event) {
        console.error('Speech recognition error occurred: ', event.error);
    };
    recognition.start();
}
// Add event listener to the microphone icon or any element you want to trigger voice input
var microphoneIcon = document.getElementById('microphoneIcon');
microphoneIcon.addEventListener('click', handleVoiceInput);
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
// Render initial tasks when the page loads
document.addEventListener('DOMContentLoaded', renderTasks);
