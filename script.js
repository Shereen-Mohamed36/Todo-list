const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const prioritySelect = document.getElementById('priority');
const filterBtns = document.querySelectorAll('.filter-btn');


// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadTheme();
});

// Add task
addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;
    if (text) {
        addTask(text, priority, false);
        saveTask(text, priority, false);
        todoInput.value = "";
    }
});

// Add task function
function addTask(text, priority, completed) {
    const li = document.createElement('li');
    li.textContent = text;
    li.dataset.priority = priority;
    if (completed) li.classList.add('completed');

    // Toggle complete
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        updateTasksInStorage();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', e => {
        e.stopPropagation();
        li.remove();
        updateTasksInStorage();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// Save task in localStorage
function saveTask(text, priority, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, priority, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update tasks in localStorage
function updateTasksInStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            priority: li.dataset.priority,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.priority, task.completed));
}

// Filter tasks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('#todo-list li').forEach(li => {
            li.style.display = (filter === 'all' ||
                                (filter === 'completed' && li.classList.contains('completed')) ||
                                (filter === 'pending' && !li.classList.contains('completed')))
                                ? 'flex' : 'none';
        });
    });
});





