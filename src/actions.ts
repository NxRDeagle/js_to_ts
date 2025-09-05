import { handleClose, handleTodoChange } from "./handlers";
import { ID, IToDo, IUser } from "./types";

/**
 * Получение имени пользователя
 * @param {ID} userId Идентификатор пользователя
 * @returns {string} Имя пользователя
 */
export function getUserName(userId: ID): string {
  let users: IUser[] = [];
  const user = users.find((user) => user.id === userId);
  return user?.name ?? "";
}

/**
 * Отрисовка задачи в разметке
 * @param {IToDo} params Параметры задачи
 * @returns {void}
 */
export function printTodo(params: IToDo) {
  const { id, userId, title, completed } = params;
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = id?.toString();
  li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;

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

  const todoList = document.getElementById("todo-list");
  todoList?.prepend(li);
}

/**
 * Создание опции пользователя в разметке
 * @param {IUser} user Пользователь
 * @returns {void}
 */
export function createUserOption(user: IUser) {
  const userSelect = document.getElementById("user-todo");
  if (!userSelect) {
    return;
  }
  const option = document.createElement("option");
  option.value = user.id?.toString();
  option.innerText = user.name;
  userSelect.append(option);
}

/**
 * Удаление задачи из разметки
 * @param {ID} todoId Идентификатор задачи
 * @returns {void}
 */
export function removeTodo(todoId: ID) {
  const todoList = document.getElementById("todo-list");
  let todos: IToDo[] = [];
  if (!todoList || !todos) {
    return;
  }
  todos = todos.filter((todo) => todo.id !== todoId);

  const todo = todoList.querySelector(`[data-id="${todoId}"]`);
  if (!todo) {
    return;
  }
  todo.querySelector("input")?.removeEventListener("change", handleTodoChange);
  todo.querySelector(".close")?.removeEventListener("click", handleClose);
  todo.remove();
}

/**
 * Вывод ошибки
 * @param {Error} error Инстанс ошибки
 * @returns {void}
 **/
export function alertError(error: Error) {
  alert(error.message);
}
