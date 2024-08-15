// app/page.js

import TodoList from "./components/todoList";
const URL = process.env.URL;
async function getTodos() {
  const res = await fetch(`http://localhost:3000/api/todos`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div>
      <h1 className="text-center py-20 text-3xl font-bold">Todo List</h1>
      <TodoList initialTodos={todos} />
    </div>
  );
}
