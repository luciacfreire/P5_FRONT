import { useState } from "preact/hooks";
import { Post } from "../types.ts";
import PostCard from "../components/PostCard.tsx";

interface Props {
  posts: Post[];
}

export default function ViewToggle({ posts }: Props) {
  const [isGridView, setIsGridView] = useState<boolean>(false);

  return (
    <div>
      <button
        class="toggle-button"
        onClick={() => setIsGridView(!isGridView)}
      >
        {isGridView ? "Vista Lista" : "Vista Cuadrícula"}
      </button>
      {isGridView ? (
        <div class="grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isGridView={isGridView} />
          ))}
        </div>
      ) : (
        <ul class="post-list">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} isGridView={isGridView} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}