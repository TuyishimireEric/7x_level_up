import React from "react";
import { TodoList } from "../components/todo/TodoList";
import { RiTodoLine } from "react-icons/ri";
import { TodoForm } from "../components/todo/AddTodo";
import { auth } from "../auth";
import { SignIn } from "../components/sign-in";
import { ModeToggle } from "../components/modeToggle";

export default async function Home() {
  const session = await auth();

  return (
    <main className="relative flex min-h-screen flex-col justify-between items-start gap-6 py-12 px-6 lg:p-24 lg:pb-12 lg:px-40 border rounded-lg shadow-sm">
      <div className="absolute top-4 right-3 lg:top-12 lg:right-24">
        <ModeToggle />
      </div>
      {session?.user ? (
        <div className="flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold mb-2">My Todo list</h1>
          <p className="text-sm flex items-center gap-2">
            <RiTodoLine size={14} /> Tasks todo
          </p>
          <TodoList />
        </div>
      ) : (
        <div className="flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold mb-2">Login!</h1>
          <p className="text-sm flex items-center gap-2 w-1/2">
            Log in to manage your tasks and stay productive.
          </p>
          <SignIn />
        </div>
      )}

      {session?.user && <TodoForm />}
    </main>
  );
}
