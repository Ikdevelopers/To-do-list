// ✅ Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {

    // ===== SIDEBAR SETUP =====
    const sidebar       = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const menuToggle    = document.querySelector(".menu-toggle");

    // DESKTOP: Toggle sidebar collapse
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    // MOBILE: Toggle menu expansion
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = sidebar.classList.toggle("menu-active");
            const icon = menuToggle.querySelector("span");
            if (icon) {
                icon.textContent = isExpanded ? "close" : "menu";
            }
        });
    }

    // AUTO-RESET on resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 728) {
            sidebar.classList.remove("menu-active");
            const icon = menuToggle?.querySelector("span");
            if (icon) icon.textContent = "menu";
        } else {
            sidebar.classList.remove("collapsed");
        }
    });

    // ===== TASK SETUP =====
    const input = document.getElementById('taskInput');
    const list  = document.getElementById('taskList');

    // Enter key triggers addTask
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') addTask();
    });

    // Load saved tasks when page opens
    loadTasks();

}); // ← end of DOMContentLoaded


// ── Add Task ────────────────────────────────────────────
function addTask(taskText = null, completed = false) {
    const input = document.getElementById('taskInput');
    const list  = document.getElementById('taskList');
    const empty = document.getElementById('emptyMsg');

    const text = taskText || input.value.trim();
    if (!text) return;

    if (empty) empty.style.display = 'none';

    // <li> — task card
    const li = document.createElement('li');
    li.className = 'task-item';

    // Bullet dot
    const bullet = document.createElement('span');
    bullet.className = 'bullet';

    // Task text span — required by saveTasks()
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    // Apply completed state if loaded from localStorage
    if (completed) {
        li.classList.add('completed');
        span.style.textDecoration = 'line-through';
        span.style.opacity = '0.5';
    }

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        span.style.opacity        = checkbox.checked ? '0.5' : '1';
        saveTasks(); // ← save on every tick/untick
    });

    // Delete button
    const del = document.createElement('button');
    del.textContent = '✕';
    del.className = 'del-btn';
    del.addEventListener('click', () => {
        li.style.opacity   = '0';
        li.style.transform = 'translateY(6px)';
        setTimeout(() => {
            li.remove();
            updateCount();
            saveTasks(); // ← save after delete
            const list = document.getElementById('taskList');
            const empty = document.getElementById('emptyMsg');
            if (list.children.length === 0 && empty) empty.style.display = 'block';
        }, 300);
    });

    li.appendChild(bullet);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);

    if (!taskText) input.value = ''; // only clear if typed, not loaded
    updateCount();
    saveTasks(); // ← save after add
}


// ── Update task counter badge ───────────────────────────
function updateCount() {
    const taskCount = document.getElementById('taskCount');
    const list      = document.getElementById('taskList');
    if (taskCount && list) {
        taskCount.textContent = list.children.length;
    }
}


// ── Save tasks to localStorage ──────────────────────────
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(task => {
        tasks.push({
            text:      task.querySelector('.task-text').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// ── Load tasks from localStorage on page load ───────────
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => addTask(task.text, task.completed));
}