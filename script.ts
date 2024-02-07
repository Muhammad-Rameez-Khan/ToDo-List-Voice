// Declare the type alias for SpeechRecognition

 // declare var SpeechRecognition: new () => SpeechRecognition;

// Define Task interface
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

// Initialize tasks array with saved tasks or empty array if no tasks found
let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList')!;
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        // Add event listener to checkbox
        const checkbox = taskItem.querySelector('input[type="checkbox"]') as HTMLInputElement;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            // Toggle completed class for text span
            if (task.completed) {
                const currentDate = new Date();
                const completionDate = currentDate.toLocaleDateString();
                const completionTime = currentDate.toLocaleTimeString();
                const completionNote = ` - Completed: ${completionDate} ${completionTime} (Task Complete)`;
                taskItem.querySelector('span')!.innerText += completionNote;
                taskItem.querySelector('span')!.classList.add('completed');
            } else {
                taskItem.querySelector('span')!.classList.remove('completed');
            }
            // Update tasks in local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask(text: string) {
    const currentDate = new Date();
    const taskDate = currentDate.toLocaleDateString();
    const taskTime = currentDate.toLocaleTimeString();

    const newTask: Task = {
        id: tasks.length + 1,
        text: `${text} - Assigned: ${taskDate} ${taskTime}`,
        completed: false
    };
    tasks.push(newTask);
    // Update tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to delete a task
function deleteTask(id: number) {
    tasks = tasks.filter(task => task.id !== id);
    // Update tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to handle voice input
function handleVoiceInput() {
  //  const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        const speechToText = event.results[0][0].transcript;
        addTask(speechToText);
    };

    recognition.onspeechend = function() {
        recognition.stop();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error occurred: ', event.error);
    };

    recognition.start();
}

// Add event listener to the microphone icon or any element you want to trigger voice input
const microphoneIcon = document.getElementById('microphoneIcon')!;
microphoneIcon.addEventListener('click', handleVoiceInput);

// Add event listener for the Add Task button
const addTaskButton = document.getElementById('addTaskButton')!;
addTaskButton.addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Render initial tasks when the page loads
document.addEventListener('DOMContentLoaded', renderTasks);
