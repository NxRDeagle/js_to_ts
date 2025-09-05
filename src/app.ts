import { createUserOption, printTodo } from "./actions";
import { getAllTodos, getAllUsers } from "./api";
import { handleSubmit } from "./handlers";
import { IToDo, IUser } from "./types";

/** Стартовая точка приложения - "самовызывающаяся" функция */
(function () {
  const form = document.querySelector("form");
  let todos: IToDo[] = [];
  let users: IUser[] = [];

  // Прослушиваем события
  document.addEventListener("DOMContentLoaded", initApp);
  form?.addEventListener("submit", handleSubmit);

  // Инициализация приложения
  function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
      [todos, users] = values;

      // Отправить в разметку
      todos.forEach((todo) => printTodo(todo));
      users.forEach((user) => createUserOption(user));
    });
  }
})();
