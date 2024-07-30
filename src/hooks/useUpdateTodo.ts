"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoInterface } from "@/src/types /todoTypes";
import { updateTodo } from "@/src/services/todoService";
import useToast from "@/src/components/alerts/alerts";

export const useUpdateTodo = (todo: TodoInterface) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const [edited, setEdited] = useState<string | null>(null);

  const handleEditChange = (description: string) => {
    setEdited(description);
  };

  const handleEditSave = async () => {
    if (edited !== null) {
      setEdited(null);
      updateMutation.mutate({ ...todo, description: edited });
    }
  };

  const handleToggleComplete = () => {
    if (updateMutation.isPending) return;
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const updateMutation = useMutation({
    mutationFn: (updatedTodo: TodoInterface) => updateTodo(updatedTodo),
    onSuccess: (response) => {
      if (response.success) {
        showSuccess("Todo Updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      } else {
        showError(response.error || "Error updating todo");
      }
    },
    onError: (error: unknown) => {
      const err = error as Error;
      showError(err.message || "Error updating todo");
    },
  });

  return {
    edited,
    setEdited,
    handleEditChange,
    handleEditSave,
    handleToggleComplete,
    isPending: updateMutation.isPending,
  };
};
