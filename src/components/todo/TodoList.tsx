"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../../services/todoService";
import { TodoItem } from "./TodoItem";
import { LoadingTask } from "./Loading";

type TodoPros = {};

export const TodoList: React.FC<TodoPros> = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2 w-full mt-8 max-h-[calc(100vh*3/5)] overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <LoadingTask key={index} />
        ))}
      </ul>
    );
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <ul className="flex flex-col gap-2 w-full mt-8 py-3 max-h-[calc(100vh*3/5)] overflow-y-auto">
      {todos?.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  );
};
