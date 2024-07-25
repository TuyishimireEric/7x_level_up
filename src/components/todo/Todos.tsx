"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/hook";
import { getTodos } from "@/src/redux/slices/todoSlice";
import { RootState } from "@/src/redux/store";
import { Todo } from "./Todo";
import { LoadingTask } from "./Loading";

type TodoPros = {};

export const Todos: React.FC<TodoPros> = () => {

  const { todos, error, loadingTodos } = useAppSelector(
    (store: RootState) => store.todo
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (todos === null && error === null) {
        dispatch(getTodos());
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [error, todos, dispatch]);

  if (todos === null && loadingTodos) {
    return (
      <ul className="flex flex-col gap-2 w-full mt-8 max-h-[calc(100vh*3/5)] overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <LoadingTask key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-2 w-full mt-8 max-h-[calc(100vh*3/5)] overflow-y-auto">
      {todos && todos.map((todo, index) => <Todo key={index} todo={todo} />)}
    </ul>
  );
};
