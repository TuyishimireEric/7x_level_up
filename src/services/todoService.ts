import axios from "axios";
import {
  FetchTodosResponse,
  TodoInterface,
  TodoResponse,
  newTodoInterface,
} from "@/src/types /todoTypes";

export const fetchTodos = async (): Promise<FetchTodosResponse> => {
  try {
    const { data } = await axios.get("/api/todo");
    return {
      success: true,
      data: data.data,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: err.message,
    };
  }
};

export const addTodo = async (
  todo: newTodoInterface,
): Promise<TodoResponse> => {
  try {
    const { data } = await axios.post("/api/todo/add", todo, {
      headers: { "Content-Type": "application/json" },
    });
    return {
      data: data.data[0],
      success: true,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: err.message,
    };
  }
};

export const deleteTodo = async (id: number): Promise<TodoResponse> => {
  try {
    const response = await fetch(`/api/todo/delete?id=${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return { data: data.data[0], success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: err.message,
    };
  }
};

export const updateTodo = async (
  todo: TodoInterface,
): Promise<TodoResponse> => {
  try {
    const { data } = await axios.put(`/api/todo/update?id=${todo.id}`, todo, {
      headers: { "Content-Type": "application/json" },
    });
    return { data: data.data[0], success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      data: null,
      success: false,
      error: err.message,
    };
  }
};
