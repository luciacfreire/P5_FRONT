import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.ts";
import SearchComponent from "../islands/SearchComponent.tsx"; 

type SearchPageData = {
  posts: Post[] | null;
};

export const handler: Handlers<SearchPageData> = {
   GET(_req, ctx) {
    return ctx.render({ posts: null });
  },
};

export default function SearchPage({ data }: PageProps<SearchPageData>) {
  return (
    <div>
      <h1>Búsqueda de Posts</h1>
      <SearchComponent initialPosts={data.posts} />
    </div>
  );
}