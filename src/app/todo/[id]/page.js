import TodoItem from "@/app/components/todoItem";

// Environment variable URL
const URL = process.env.URL;

async function getTodo(id) {
  try {
    if (!URL) {
      throw new Error("API URL is not defined in environment variables");
    }

    console.log("Fetching todo with ID:", id);
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
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

    // Validate the fetched data
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

export default async function TodoPage({ params }) {
  console.log("Rendering TodoPage with params:", params);

  const { id } = params;

  if (!id) {
    console.error("Todo ID is not provided in params");
    return <div>Error: Todo ID is missing</div>;
  }

  const result = await getTodo(id);

  if ("error" in result) {
    console.error("Error in TodoPage:", result.error);
    return <div>Error: {result.error}</div>;
  }

  console.log("Rendering TodoItem with:", result);
  return <TodoItem initialTodo={result} />;
}
