import { useState } from "preact/hooks";

interface Props {
  initialMessage?: string;
}

export default function CreatePostForm({ initialMessage }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(initialMessage);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    const response = await fetch("/post/create", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setMessage(result.message);
    setTitle("");
    setContent("");
    setAuthor("");
    setIsSubmitting(false);
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onInput={(e) => setTitle(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label for="content">Contenido</label>
          <textarea
            id="content"
            value={content}
            onInput={(e) => setContent(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label for="author">Autor</label>
          <input
            type="text"
            id="author"
            value={author}
            onInput={(e) => setAuthor(e.currentTarget.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Crear Post"}
        </button>
      </form>
    </div>
  );
}