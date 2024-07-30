import React from 'react';
import { RiTodoLine } from 'react-icons/ri';
import { TodoForm } from '../components/todo/AddTodo';
import { auth } from '../auth';
import { ModeToggle } from '../components/modeToggle';
import { Todos } from '../components/todo/Todos';
import { ToastContainer } from 'react-toastify';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="relative flex min-h-screen flex-col justify-between items-start gap-6 py-12 px-6 lg:p-24 lg:pb-12 lg:px-40 border rounded-lg shadow-sm">
        <div className="absolute top-4 right-3 lg:top-12 lg:right-24">
          <ModeToggle />
        </div>
        <div className="flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold mb-2">My Todo list</h1>
          <p className="text-sm flex items-center gap-2">
            <RiTodoLine size={14} /> Tasks todo
          </p>
          <Todos />
        </div>
        <TodoForm />
      </main>
      <ToastContainer />
    </>
  );
}
