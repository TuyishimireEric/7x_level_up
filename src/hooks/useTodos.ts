"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/src/services/todoService";
import { FetchTodosResponse, TodoInterface } from "@/src/types /todoTypes";

export const useTodos = (initialData: TodoInterface[]) => {
  const initialFetchTodosResponse: FetchTodosResponse = {
    success: true,
    data: initialData,
  };

  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    initialData: initialFetchTodosResponse,
  });
};
