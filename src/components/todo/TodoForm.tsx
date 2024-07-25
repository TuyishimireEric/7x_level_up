"use client";

import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/hook";
import {
  addTodo,
  getTodos,
  newTodoInterface,
} from "@/src/redux/slices/todoSlice";
import { RootState } from "@/src/redux/store";
import { Button } from "../ui/button";

type TodoFormProps = {};

const initialValues: newTodoInterface = {
  description: "",
};

export const TodoForm: React.FC<TodoFormProps> = () => {
  const [formData, setFormData] = useState<newTodoInterface>(initialValues);

  const dispatch = useAppDispatch();
  const { loadingTodos } = useAppSelector(
    (store: RootState) => store.todo
  );

  const handleSubmit = async () => {
    await dispatch(addTodo(formData));
    setFormData(initialValues);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="shadow-sm flex w-full gap-4 p-8 px-2 bg-main rounded-lg h-12 items-center"
    >
      <Input
        type="text"
        placeholder="Add todo..."
        value={formData.description}
        className="bg-white text-md"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Button disabled={loadingTodos}>Add task</Button>
    </form>
  );
};
