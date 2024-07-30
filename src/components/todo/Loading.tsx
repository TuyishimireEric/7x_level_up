import React from 'react';

type TodoPros = {};

export const LoadingTask: React.FC<TodoPros> = () => {
  return (
    <li className="w-full p-4 border shadow-sm hover:shadow-md  transition-all text-md cursor-pointer rounded-md flex items-center gap-4 animate__animated animate__fadeInUp">
      Loading ...
    </li>
  );
};
