const tasks = [];
let taskId = 0;

const taskInput = document.getElementById('task-input');
const taskList = document.querySelector('.listTasks');

function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            task_id: taskId,
            text: taskText,
            done: false
        };
        tasks.push(task);
        taskId++;
        taskInput.value = '';
        renderTaskList();
    }
}

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskHTML = `
            <div class="task" data-task-id="${task.task_id}">
                <input type="checkbox" ${task.done ? 'checked' : ''}>
                <label>${task.text}</label>
                <i class="fas fa-times delete-btn" aria-hidden="true"></i>
            </div>
        `;
        taskList.insertAdjacentHTML('beforeend', taskHTML);
    });
}

function doneTask(event) {
    const taskId = event.target.parentNode.dataset.taskId;
    const task = tasks.find((task) => task.task_id === parseInt(taskId));
    task.done = !task.done;
    renderTaskList();
}

function deleteTask(event) {
    const taskId = event.target.parentNode.dataset.taskId;
    tasks = tasks.filter((task) => task.task_id !== parseInt(taskId));
    renderTaskList();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', addTask);
    taskList.addEventListener('click', (event) => {
        if (event.target.type === 'checkbox') {
            doneTask(event);
        } else if (event.target.classList.contains('delete-btn')) {
            deleteTask(event);
        }
    });
});