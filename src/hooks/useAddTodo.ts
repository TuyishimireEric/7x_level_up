'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '@/src/services/todoService';
import { newTodoInterface } from '@/src/types /todoTypes';
import useToast from '@/src/components/alerts/alerts';

const initialValues: newTodoInterface = {
  description: '',
};

export const useAddTodo = () => {
  const [formData, setFormData] = useState<newTodoInterface>(initialValues);
  const { showSuccess, showError } = useToast();

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: response => {
      if (response.success) {
        showSuccess('Todo added successfully!');
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        setFormData(initialValues);
      } else {
        showError(response.error || 'Error adding todo');
      }
    },
    onError: (error: unknown) => {
      const err = error as Error;
      showError(err.message || 'Error adding todo');
    },
  });

  const handleSubmit = () => {
    addMutation.mutate(formData);
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    isPending: addMutation.isPending,
  };
};
