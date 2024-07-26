import axios from "axios";

export interface TodoInterface {
  id: number;
  description: string;
  completed: boolean;
  createdAt?: string;
}

export interface newTodoInterface {
  description: string;
}

export const fetchTodos = async (): Promise<TodoInterface[]> => {
  const { data } = await axios.get("/api/todo");
  return data.data;
};

export const addTodo = async (
  todo: newTodoInterface
): Promise<TodoInterface> => {
  const { data } = await axios.post("/api/todo/add", todo, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data[0];
};

export const deleteTodo = async (id: number): Promise<{ id: number }> => {
  const response = await fetch(`/api/todo/delete?id=${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return { id: data.data[0].id };
};

export const updateTodo = async (
  todo: TodoInterface
): Promise<TodoInterface> => {
  const { data } = await axios.put(`/api/todo/update?id=${todo.id}`, todo, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data[0];
};
