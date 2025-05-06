import { Handlers, PageProps } from "$fresh/server.ts";
import ViewToggle from "../islands/ViewToggle.tsx";
import { Post } from "../types.ts";


export const handler: Handlers<{ posts: Post[] | null }> = {
  async GET(_req, ctx) {
    try {
      const response = await fetch(`https://back-p5-y0e1.onrender.com/api/posts`);
      if (!response.ok) throw new Error("Error fetching posts");
      const { data } = await response.json();
      const posts = data.posts.map((post: any) => ({
        ...post,
        id: post._id,
      }));
      return ctx.render({ posts });
    } catch (_error) {
      return ctx.render({ posts: null });
    }
  },
};

export default function Page({ data }: PageProps<{ posts: Post[] | null }>) {
  
  if (!data.posts) {
    return <div>No se encontraron posts.</div>;
  }
  
  return (
    <div>
      <h1>Listado de Posts</h1>
      <ViewToggle posts={data.posts} />
    </div>
  );
}