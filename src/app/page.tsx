import React from "react";
import { Todos } from "../components/todo/Todos";
import { RiTodoLine } from "react-icons/ri";
import { TodoForm } from "../components/todo/TodoForm";
import { auth } from "../auth";
import { SignIn } from "../components/sign-in";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col justify-between items-start gap-6 p-24 pb-12 px-40 border rounded-lg shadow-sm">
      {session?.user ? (
        <div className="flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold mb-2">My Todo list</h1>
          <p className="text-sm flex items-center gap-2">
            <RiTodoLine size={14} /> Tasks todo
          </p>
          <Todos />
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
