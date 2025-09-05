"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function () {
    // Globals
    const todoList = document.getElementById("todo-list");
    const userSelect = document.getElementById("user-todo");
    const form = document.querySelector("form");
    let todos = [];
    let users = [];
    // Attach Events
    document.addEventListener("DOMContentLoaded", initApp);
    form?.addEventListener("submit", handleSubmit);
    // Basic Logic
    function getUserName(userId) {
        const user = users.find((user) => user.id === userId);
        return user?.name ?? "";
    }
    function printTodo({ id, userId, title, completed }) {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = id?.toString();
        li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(userId)}</b></span>`;
        const status = document.createElement("input");
        status.type = "checkbox";
        status.checked = completed;
        status.addEventListener("change", handleTodoChange);
        const close = document.createElement("span");
        close.innerHTML = "&times;";
        close.className = "close";
        close.addEventListener("click", handleClose);
        li.prepend(status);
        li.append(close);
        todoList?.prepend(li);
    }
    function createUserOption(user) {
        if (!userSelect) {
            return;
        }
        const option = document.createElement("option");
        option.value = user.id?.toString();
        option.innerText = user.name;
        userSelect.append(option);
    }
    function removeTodo(todoId) {
        if (!todoList) {
            return;
        }
        todos = todos.filter((todo) => todo.id !== todoId);
        const todo = todoList.querySelector(`[data-id="${todoId}"]`);
        if (!todo) {
            return;
        }
        todo
            .querySelector("input")
            ?.removeEventListener("change", handleTodoChange);
        todo.querySelector(".close")?.removeEventListener("click", handleClose);
        todo.remove();
    }
    function alertError(error) {
        alert(error.message);
    }
    // Event Logic
    function initApp() {
        Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
            [todos, users] = values;
            // Отправить в разметку
            todos.forEach((todo) => printTodo(todo));
            users.forEach((user) => createUserOption(user));
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (!form) {
            return;
        }
        createTodo({
            userId: Number(form.user.value),
            title: form.todo.value,
            completed: false,
        });
    }
    function handleTodoChange() {
        const parent = this.parentElement;
        if (!parent) {
            return;
        }
        const todoId = parent?.dataset.id;
        const completed = this.checked;
        todoId && toggleTodoComplete(todoId, completed);
    }
    function handleClose() {
        const parent = this.parentElement;
        if (!parent) {
            return;
        }
        const todoId = parent.dataset.id;
        todoId && deleteTodo(todoId);
    }
    // Async logic
    async function getAllTodos() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=15");
            const data = await response.json();
            return data;
        }
        catch (error) {
            error instanceof Error && alertError(error);
        }
    }
    async function getAllUsers() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=5");
            const data = await response.json();
            return data;
        }
        catch (error) {
            error instanceof Error && alertError(error);
        }
    }
    async function createTodo(todo) {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newTodo = await response.json();
            printTodo(newTodo);
        }
        catch (error) {
            error instanceof Error && alertError(error);
        }
    }
    async function toggleTodoComplete(todoId, completed) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: "PATCH",
                body: JSON.stringify({ completed }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to connect with the server! Please try later.");
            }
        }
        catch (error) {
            error instanceof Error && alertError(error);
        }
    }
    async function deleteTodo(todoId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                removeTodo(todoId);
            }
            else {
                throw new Error("Failed to connect with the server! Please try later.");
            }
        }
        catch (error) {
            error instanceof Error && alertError(error);
        }
    }
})();
//# sourceMappingURL=app.js.map