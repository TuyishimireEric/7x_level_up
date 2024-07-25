"use client";

import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Input } from "@/src/components/ui/input";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { GoCheckCircle } from "react-icons/go";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks/hook";
import {
  TodoInterface,
  deleteTodo,
  updateTodo,
} from "@/src/redux/slices/todoSlice";
import { RootState } from "@/src/redux/store";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../ui/button";

type TodoPros = { todo: TodoInterface };

export const Todo: React.FC<TodoPros> = ({ todo }) => {
  const [edited, setEdited] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loadingTodos } = useAppSelector((store: RootState) => store.todo);

  const handleEditChange = (description: string) => {
    setEdited(description);
  };

  const handleEditSave = async (id: number) => {
    if (edited !== null) {
      setEdited(null);
      await dispatch(updateTodo({ ...todo, description: edited }));
    }
  };

  const handleCompleted = async () => {
    await dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  const handleDeleteTodo = async (id: number) => {
    await dispatch(deleteTodo(id));
  };

  return (
    <li className="w-full p-2 border shadow-sm hover:shadow-md  transition-all text-md cursor-pointer rounded-md flex items-center gap-4 animate__animated animate__fadeInUp">
      <span
        className="cursor-pointer font-thin text-gray-500 "
        onClick={() => handleCompleted()}
      >
        {todo.completed ? (
          <IoIosCheckmarkCircleOutline size={24} />
        ) : (
          <MdOutlineRadioButtonUnchecked size={24} />
        )}
      </span>
      <Input
        value={edited || todo.description}
        onChange={(e) => handleEditChange(e.target.value)}
        className={`flex-grow p-1 text-lg border-0 ${
          todo.completed && "line-through text-gray-600"
        }`}
      />
      {edited === null ? (
        <Button
          className="ml-2"
          variant="outline"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <span className="test-xs pr-2 text-gray-700">Remove</span>
          <RiDeleteBin6Line size={18} />
        </Button>
      ) : (
        <Button variant="outline" onClick={() => handleEditSave(todo.id)}>
          <span className="test-xs pr-2 text-gray-700">Save</span>
          <GoCheckCircle size={24} />
        </Button>
      )}
    </li>
  );
};
