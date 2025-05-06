import { useSignal } from "@preact/signals";
import { Post } from "../types.ts";
import PostCard from "../components/PostCard.tsx";
import { useEffect } from "preact/hooks";

export default function SearchComponent({ initialPosts }: { initialPosts: Post[] | null }) {
  const searchTerm = useSignal<string>("");
  const posts = useSignal<Post[] | null>(initialPosts);

  useEffect(() => {
    if (searchTerm.value) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `https://back-p5-y0e1.onrender.com/api/posts?search=${searchTerm.value}`
          );
          if (!response.ok) throw new Error(`Error fetching posts: ${response.status} ${response.statusText}`);
          const result = await response.json();
          posts.value = result.data.posts.map((post: any) => ({
            ...post,
            id: post._id,
          }));
        } catch (error) {
          posts.value = null;
        }
      };
      fetchPosts();
    } else {
      posts.value = null;
    }
  }, [searchTerm.value]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm.value}
        onInput={(e) => (searchTerm.value = e.currentTarget.value)}
        placeholder="Buscar posts..."
      />
      {posts.value ? (
        <ul>
          {posts.value.map((post) => (
            <li key={post.id}>
              <PostCard post={post} isGridView={false} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay resultados para mostrar.</p>
      )}
    </div>
  );
}