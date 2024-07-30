export interface TodoInterface {
  id: number;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface newTodoInterface {
  description: string;
}

export interface FetchTodosResponse {
  success: boolean;
  data: TodoInterface[] | null;
  error?: string;
}

export interface TodoResponse {
  success: boolean;
  data: TodoInterface[] | null;
  error?: string;
}
