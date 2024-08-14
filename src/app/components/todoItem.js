// components/TodoItem.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoItem({ initialTodo }) {
  const [todo, setTodo] = useState(initialTodo);
  const [editText, setEditText] = useState(initialTodo.text);
  const router = useRouter();

  const updateTodo = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    });
    const updatedTodo = await res.json();
    setTodo(updatedTodo);
  };

  return (
    <div>
      <h1 className="text-center py-20 font-bold text-3xl ">Todo Item</h1>
      <p className="text-center">ID: {todo.id}</p>
      <form onSubmit={updateTodo} className=" text-center">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border-2 p-3 rounded-md  border-blue-700"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-700 text-white rounded-md mt-6 lg:ml-7"
        >
          Update
        </button>
      </form>
      <button
        onClick={() => router.push("/")}
        className="px-8 py-2 bg-blue-700 text-white rounded-md block m-auto mt-8"
      >
        Back to List
      </button>
    </div>
  );
}
// components/TodoItem.js
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function TodoItem({ initialTodo }) {
//   const [todo, setTodo] = useState(initialTodo);
//   const [editText, setEditText] = useState(initialTodo.text);
//   const [error, setError] = useState(null); // Error handling state
//   const router = useRouter();

//   const updateTodo = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear any previous errors

//     try {
//       const res = await fetch(`/api/todos/${todo.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: editText }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update todo"); // Handle HTTP errors
//       }

//       const updatedTodo = await res.json();
//       setTodo(updatedTodo); // Update state with the new todo
//     } catch (err) {
//       setError(err.message); // Set error state if something goes wrong
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-center py-20 font-bold text-3xl">Todo Item</h1>
//       <p className="text-center">ID: {todo.id}</p>
//       <form onSubmit={updateTodo} className="text-center">
//         <input
//           type="text"
//           value={editText}
//           onChange={(e) => setEditText(e.target.value)}
//           className="border-2 p-3 rounded-md border-blue-700"
//         />
//         <button
//           type="submit"
//           className="px-5 py-2 bg-blue-700 text-white rounded-md mt-6 lg:ml-7"
//         >
//           Update
//         </button>
//       </form>

//       {error && (
//         <p className="text-center text-red-500 mt-4">{error}</p> // Display error if any
//       )}

//       <button
//         onClick={() => router.push("/")}
//         className="px-8 py-2 bg-blue-700 text-white rounded-md block m-auto mt-8"
//       >
//         Back to List
//       </button>
//     </div>
//   );
// }
