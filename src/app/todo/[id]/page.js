import { useEffect, useState } from 'react';
import TodoItem from "@/app/components/todoItem";

const URL = process.env.URL || 'http://localhost:3000';

async function getTodo(id) {
  try {
    console.log("Fetching todo with ID:", id);
    const res = await fetch(`${URL}/api/todos/${id}`, {
      cache: "no-store",
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`HTTP error! status: ${res.status}, body: ${errorData}`);
      return { error: `Failed to fetch todo. Status: ${res.status}` };
    }

    const data = await res.json();
    console.log("Received data:", data);

    if (!data || typeof data !== "object" || !data.id) {
      console.error("Invalid data received:", data);
      return { error: "Invalid data received from server" };
    }

    return data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return { error: "An unexpected error occurred while fetching the todo" };
  }
}

export default function TodoPage({ params }) {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      if (!params.id) {
        setError("Todo ID is missing");
        return;
      }

      const result = await getTodo(params.id);

      if ("error" in result) {
        setError(result.error);
      } else {
        setTodo(result);
      }
    };

    fetchTodo();
  }, [params.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!todo) {
    return <div>Loading...</div>;
  }

  return <TodoItem initialTodo={todo} />;
}
