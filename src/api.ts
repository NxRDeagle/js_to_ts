import { alertError, printTodo, removeTodo } from "./actions";
import { ID, IToDo, IUser } from "./types";
import { MAIN_API_URL } from "./constants";

/**
 * Получение списка всех задач
 * @returns {Promise<IToDo[]>} Список всех задач
 */
export async function getAllTodos(): Promise<IToDo[]> {
  try {
    const response = await fetch(`${MAIN_API_URL}todos?_limit=15`);
    const data: IToDo[] = await response.json();
    return data;
  } catch (error) {
    error instanceof Error && alertError(error);
    return [];
  }
}

/**
 * Получение списка всех пользователей
 * @returns {Promise<IUser[]>} Список всех пользователей
 */
export async function getAllUsers(): Promise<IUser[]> {
  try {
    const response = await fetch(`${MAIN_API_URL}users?_limit=5`);
    const data: IUser[] = await response.json();
    return data;
  } catch (error) {
    error instanceof Error && alertError(error);
    return [];
  }
}

/**
 * Создание задачи
 * @param {Omit<IToDo, "id">} todo Параметры задачи (кроме id)
 * @returns {Promise<IToDo>} Новая задача
 */
export async function createTodo(todo: Omit<IToDo, "id">): Promise<IToDo> {
  try {
    const response = await fetch(`${MAIN_API_URL}todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTodo: IToDo = await response.json();
    printTodo(newTodo);
  } catch (error) {
    error instanceof Error && alertError(error);
    return null;
  }
}

/**
 * Переключение статуса завершенности задачи
 * @param {ID} todoId Идентификатор задачи
 * @param {boolean} completed Статус (true - завершено, false - активно)
 * @returns {void}
 */
export async function toggleTodoComplete(todoId: ID, completed: boolean) {
  try {
    const response = await fetch(`${MAIN_API_URL}todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({ completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to connect with the server! Please try later.");
    }
  } catch (error) {
    error instanceof Error && alertError(error);
  }
}

/**
 * Удаление задачи
 * @param {ID} todoId Идентификатор задачи
 * @returns {void}
 */
export async function deleteTodo(todoId: ID) {
  try {
    const response = await fetch(`${MAIN_API_URL}todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      removeTodo(todoId);
    } else {
      throw new Error("Failed to connect with the server! Please try later.");
    }
  } catch (error) {
    error instanceof Error && alertError(error);
  }
}
