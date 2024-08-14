// app/api/todos/route.js

export const todos = [
  { id: 1, text: "Learn Next.js" },
  { id: 2, text: "Build a todo app" },
];

// ... rest of your route handlers
export async function GET() {
  return new Response(JSON.stringify(todos), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const newTodo = {
    id: Date.now(),
    text: body.text,
  };
  todos.push(newTodo);
  return new Response(JSON.stringify(newTodo), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
