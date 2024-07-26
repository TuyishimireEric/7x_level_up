"use client";

import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "../ui/button";
import { newTodoInterface, addTodo } from "@/src/services/todoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TodoFormProps = {};

const initialValues: newTodoInterface = {
  description: "",
};

export const TodoForm: React.FC<TodoFormProps> = () => {
  const [formData, setFormData] = useState<newTodoInterface>(initialValues);

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setFormData(initialValues);
    },
  });

  const handleSubmit = async () => {
    addMutation.mutate(formData);
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
      <Button disabled={addMutation.isPending}>
        {addMutation.isPending ? "loading ..." : "Add task"}
      </Button>
    </form>
  );
};
