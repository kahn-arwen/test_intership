document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const clearButton = document.getElementById("clear");

    // Array to store tasks
    let tasks = [];

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="delete">×</span>
                <span class="edit">&#9998;</span>
                <input type="checkbox">
                <label>${task.text}</label>
            `;
            if (task.completed) {
                li.classList.add("completed");
                li.querySelector("input[type='checkbox']").checked = true;
            }
            taskList.appendChild(li);

            // Event listener for delete task
            li.querySelector(".delete").addEventListener("click", () => {
                deleteTask(index);
            });

            // Event listener for edit task
            li.querySelector(".edit").addEventListener("click", () => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null) {
                    tasks[index].text = newText;
                    renderTasks();
                }
            });
        });
    };

    // Function to add a new task
    const addTask = (text) => {
        tasks.push({ text, completed: false });
        renderTasks();
    };

    // Function to delete a task
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Function to toggle task completion
    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Event listener for form submission
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTaskInput = document.getElementById("new-task");
        const text = newTaskInput.value.trim();
        if (text !== "") {
            addTask(text);
            newTaskInput.value = "";
        }
    });

    // Event listener for task deletion
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const index = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
            deleteTask(index);
        }
    });

    // Event listener for task completion
    taskList.addEventListener("change", (e) => {
        if (e.target.matches("input[type='checkbox']")) {
            const index = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
            toggleTaskCompletion(index);
        }
    });

    // Event listener for clearing all tasks
    clearButton.addEventListener("click", () => {
        tasks = [];
        renderTasks();
    });

    // Initial rendering
    renderTasks();
});
