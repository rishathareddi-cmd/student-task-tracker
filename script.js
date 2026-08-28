const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const pendingCount = document.getElementById('pendingCount');

let tasks = [];

function updateCounter() {
    totalCount.textContent = tasks.length;
    const pending = tasks.filter(t =>!t.completed).length;
    pendingCount.textContent = pending;
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    updateCounter();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Please enter a task');
        return;
    }
    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    renderTasks();
}

function completeTask(index) {
    tasks[index].completed =!tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial counter
updateCounter();
