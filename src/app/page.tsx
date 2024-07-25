import React from "react";
import { Todos } from "../components/todo/Todos";
import { RiTodoLine } from "react-icons/ri";
import { TodoForm } from "../components/todo/TodoForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between items-start gap-6 p-24 pb-12 px-40 border rounded-lg shadow-sm">
      <div className="flex-col gap-4 w-full">
        <h1 className="text-3xl font-bold mb-2">My Todo list</h1>
        <p className="text-sm flex items-center gap-2">
          <RiTodoLine size={14} /> {"  "} Tasks todo
        </p>
        <Todos />
      </div>

      <TodoForm />
    </main>
  );
}
