import { createTodo, deleteTodo, toggleTodoComplete } from "./api";

/**
 * Обработчик изменения задачи
 * @param {HTMLInputElement} this Элемент поля ввода
 * @returns {void}
 */
export function handleTodoChange(this: HTMLInputElement) {
  const parent = this.parentElement;
  if (!parent) {
    return;
  }
  const todoId = parent?.dataset.id;
  const completed = this.checked;
  todoId && toggleTodoComplete(todoId, completed);
}

/**
 * Обработчик закрытия задачи
 * @param {HTMLSpanElement} this Элемент текста
 * @returns {void}
 */
export function handleClose(this: HTMLSpanElement) {
  const parent = this.parentElement;
  if (!parent) {
    return;
  }
  const todoId = parent.dataset.id;
  todoId && deleteTodo(todoId);
}

/**
 * Обработчик отправки формы
 * @param {Event} event Событие отправки
 * @returns {void}
 */
export function handleSubmit(event: Event) {
  event.preventDefault();
  const form = document.querySelector("form");
  if (!form) {
    return;
  }
  createTodo({
    userId: Number(form.user.value),
    title: form.todo.value,
    completed: false,
  });
}
