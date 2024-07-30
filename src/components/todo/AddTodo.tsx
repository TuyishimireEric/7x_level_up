'use client';

import React from 'react';
import { Input } from '@/src/components/ui/input';
import { Button } from '../ui/button';
import { useAddTodo } from '@/src/hooks';
type TodoFormProps = {};

export const TodoForm: React.FC<TodoFormProps> = () => {
  const { formData, setFormData, handleSubmit, isPending } = useAddTodo();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
      className="shadow-sm flex w-full gap-4 p-8 px-2 bg-main rounded-lg h-12 items-center"
    >
      <Input
        type="text"
        placeholder="Add todo..."
        value={formData.description}
        className="bg-white dark:bg-black text-md"
        onChange={e =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <Button disabled={isPending}>
        {isPending ? 'loading ...' : 'Add task'}
      </Button>
    </form>
  );
};
