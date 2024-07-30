'use client';

import React from 'react';
import { useTodos } from '../../hooks';
import { TodoList } from './TodoList';

type TodoPros = {};

export const Todos: React.FC<TodoPros> = () => {
  const { data, error, isPending } = useTodos([]);

  return <TodoList data={data.data} error={error} isPending={isPending} />;
};
