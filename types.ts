  export type Post = {
    id: string;
    title: string;
    summary: string;
    cover: string;
    content: string;
    author: string;
    likes: number;
    createdAt: string;
    updatedAt:string;
    comments: Comment[]
  }
  
  export type Comment = {
    id: string;
    author:string,
    content: string;
    createdAt: string;
  }