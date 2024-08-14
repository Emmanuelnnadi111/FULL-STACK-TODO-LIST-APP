// components/TodoList.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });
    const newItem = await res.json();
    setTodos([...todos, newItem]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="text-center">
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-[50%] p-3 rounded-md border border-blue-700"
        />
        <button
          type="submit"
          className="ml-10 bg-blue-700 text-white px-5 py-2 rounded-md"
        >
          Add
        </button>
      </form>
      <div className="p-2">
        <table className="w-full  text-left m-auto lg:w-[57%] mt-10 ">
          <thead>
            <tr className="">
              <th className="py-3">Todos</th>
              <th className="text-right">Delete Todos</th>
            </tr>
          </thead>
          {todos.map((todo) => (
            <tbody key={todo.id}>
              <tr className="border-t-2 border-b-2 mt-5">
                <td>
                  <Link
                    href={`/todo/${todo.id}`}
                    className=":hover text-gray-900 font-bold"
                  >
                    {todo.text}
                  </Link>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-5 py-2 bg-blue-700 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
