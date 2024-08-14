// app/api/todos/[id]/route.js
import { todos } from "../route";

export async function GET(request, { params }) {
  console.log("Received request for todo ID:", params.id);

  try {
    const todoId = parseInt(params.id);

    if (isNaN(todoId)) {
      console.error("Invalid todo ID:", params.id);
      return new Response(JSON.stringify({ message: "Invalid todo ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const todo = todos.find((t) => t.id === todoId);

    if (!todo) {
      console.log("Todo not found for ID:", todoId);
      return new Response(JSON.stringify({ message: "Todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Returning todo:", todo);
    return new Response(JSON.stringify(todo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET /api/todos/[id]:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
