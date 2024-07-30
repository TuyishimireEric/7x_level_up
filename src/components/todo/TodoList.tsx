import React from 'react';
import { TodoItem } from './TodoItem';
import { LoadingTask } from './Loading';
import { TodoInterface } from '@/src/types /todoTypes';

type TodoPros = {
  data: TodoInterface[] | null;
  error: Error | null;
  isPending: boolean;
};

export const TodoList: React.FC<TodoPros> = ({ error, data, isPending }) => {
  if (isPending) {
    return (
      <ul className="flex flex-col gap-2 w-full mt-8 max-h-[calc(100vh*3/5)] overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <LoadingTask key={index} />
        ))}
      </ul>
    );
  }

  if (error || data == null) {
    return <div>error</div>;
  }

  return (
    <ul className="flex flex-col gap-2 w-full mt-8 py-3 max-h-[calc(100vh*3/5)] overflow-y-auto">
      {data
        ?.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((todo, index) => <TodoItem key={index} todo={todo} />)}
    </ul>
  );
};
