import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface TodoInterface {
  id: number;
  description: string;
  completed: boolean;
  createdAt?: string;
}

export interface newTodoInterface {
  description: string;
}

export const getTodos = createAsyncThunk(
  "todo/getTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data.data;
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todo: newTodoInterface, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/todo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      const data = await response.json();
      return data.data[0];
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todo/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data.data[0];
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (todo: TodoInterface, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todo/update?id=${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      const data = await response.json();
      return data.data[0];
    } catch (err: unknown) {
      const error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

interface todoStateInterface {
  todos: TodoInterface[] | null;
  previousTodos: TodoInterface[] | null;
  loadingTodos: boolean;
  error: string | null;
}

const initialState: todoStateInterface = {
  todos: null,
  previousTodos: null,
  loadingTodos: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loadingTodos = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loadingTodos = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loadingTodos = false;
        state.todos = null;
        state.error = action.payload as string;
      })
      .addCase(addTodo.pending, (state) => {
        state.loadingTodos = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loadingTodos = false;
        const updated =
          state.todos && state.todos.length > 0
            ? [...state.todos, action.payload]
            : [action.payload];
        state.todos = updated;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loadingTodos = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loadingTodos = true;
        state.error = null;
        // Updating the UI Optimistically
        state.previousTodos = state.todos;
        const updated =
          state.todos?.filter((todo) => todo.id != action.meta.arg) || [];
        state.todos = updated;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loadingTodos = false;
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loadingTodos = false;
        // Revert the state for rejected request
        state.todos = state.previousTodos;
        state.error = action.payload as string;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.loadingTodos = true;

        // Updating the UI Optimistically
        state.previousTodos = state.todos;
        if (state.todos !== null) {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.meta.arg.id
          );
          if (index !== -1) {
            state.todos[index] = action.meta.arg;
          }
        }
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.loadingTodos = false;
        state.error = null;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loadingTodos = false;

        // Revert the state for rejected request
        state.todos = state.previousTodos;
        state.error = action.payload as string;
      });
  },
});

export default todoSlice.reducer;
