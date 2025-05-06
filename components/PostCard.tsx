import { Post } from "../types.ts";

type Props = {
  post: Post;
  isGridView: boolean;
};

export default function PostCard({ post, isGridView }: Props) {

  return (
    <div class="card">
      {isGridView ? (
        <>
          <img src={post.cover} alt={`Portada de ${post.title}`} />
          <h3>{post.title}</h3>
          <p>Autor: {post.author}</p>
          <p>Likes: {post.likes ?? 0}</p>
        </>
      ) : (
        <>
          <div>
            <h3>{post.title}</h3>
            <p>Likes: {post.likes ?? 0}</p>
          </div>
          <div>
            <p>Autor: {post.author}</p>
          </div>
        </>
      )}
    </div>
  );
}