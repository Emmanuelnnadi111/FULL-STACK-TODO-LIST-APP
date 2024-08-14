// // app/page.js

// import TodoList from "./components/todoList";

// async function getTodos() {
//   const res = await fetch("http://localhost:3000/api/todos", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch todos");
//   }
//   return res.json();
// }

// export default async function Home() {
//   const todos = await getTodos();

//   return (
//     <div>
//       <h1 className="text-center py-20 text-3xl font-bold">Todo List</h1>
//       <TodoList initialTodos={todos} />
//     </div>
//   );
// }
// import { use } from "react";
// import TodoList from "./components/todoList";

// async function getTodos() {
//   const res = await fetch("/api/todos", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch todos");
//   }
//   return res.json();
// }

// export default function Home() {
//   const todos = use(getTodos());

//   return (
//     <div>
//       <h1 className="text-center py-20 text-3xl font-bold">Todo List</h1>
//       <TodoList initialTodos={todos} />
//     </div>
//   );
// }
import TodoList from "./components/todoList";

async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
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
