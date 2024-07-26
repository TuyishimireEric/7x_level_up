// src/components/todo/TodoItem.tsx

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodo,
  updateTodo,
  TodoInterface,
} from "../../services/todoService";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Input } from "@/src/components/ui/input";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { GoCheckCircle } from "react-icons/go";

interface TodoItemProps {
  todo: TodoInterface;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const queryClient = useQueryClient();
  const [edited, setEdited] = useState<string | null>(null);

  const handleEditChange = (description: string) => {
    setEdited(description);
  };

  const handleEditSave = async (id: number) => {
    if (edited !== null) {
      setEdited(null);
      updateMutation.mutate({ ...todo, description: edited });
    }
  };

  const deleteMutation = useMutation<{ id: number }, Error, number>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedTodo: TodoInterface) => updateTodo(updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  const handleToggleComplete = () => {
    if (updateMutation.isPending) return;
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  return (
    <li className="w-full p-2 border shadow-sm hover:shadow-md  transition-all text-md cursor-pointer rounded-md flex items-center gap-2 md:gap-4 animate__animated animate__fadeInUp">
      <span
        className="cursor-pointer font-thin text-gray-500 "
        onClick={() => handleToggleComplete()}
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
        className={`flex-grow p-1 text-sm md:text-lg border-0 ${
          todo.completed && "line-through text-gray-600"
        }`}
      />
      {edited === null ? (
        <Button
          className="ml-2"
          variant="outline"
          disabled={deleteMutation.isPending}
          onClick={() => handleDelete()}
        >
          {deleteMutation.isPending ? (
            "loading ... "
          ) : (
            <>
              <span className="hidden md:block test-xs pr-2 text-gray-700">
                Remove
              </span>
              <RiDeleteBin6Line size={18} />
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => handleEditSave(todo.id)}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            "loading ... "
          ) : (
            <>
              <span className="hidden md:block test-xs pr-2 text-gray-700">
                Save
              </span>
              <GoCheckCircle size={24} />
            </>
          )}
        </Button>
      )}
    </li>
  );
};
