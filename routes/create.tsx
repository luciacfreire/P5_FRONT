import { Handlers, PageProps } from "$fresh/server.ts";
import CreatePostForm from "../islands/CreatePostForm.tsx";

interface CreatePostData {
  message?: string;
}

export const handler: Handlers<CreatePostData> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";
    const author = formData.get("author")?.toString() || "";

    const response = await fetch("https://back-p5-y0e1.onrender.com/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, author }),
    });

    const result = await response.json();
    return ctx.render({ message: `Creado con ID ${result.data._id}` });
  },

  GET(_req, ctx) {
    return ctx.render({});
  },
};

export default function CreatePostPage({ data }: PageProps<CreatePostData>) {
  return (
    <div>
      <h1>Crear Nuevo Post</h1>
      <CreatePostForm initialMessage={data.message} />
    </div>
  );
}