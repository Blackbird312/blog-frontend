import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type Comment = {
  id: string;
  authorId?: string | null;
  content: string;
  createdAt: string;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

export async function fetchCommentsBySlug(slug: string, params?: { page?: number; size?: number; sort?: string }) {
  const res = await axios.get<PageResponse<Comment>>(`${API_BASE}/articles/${slug}/comments`, {
    params: {
      page: params?.page ?? 0,
      size: params?.size ?? 20,
      sort: params?.sort ?? "createdAt,desc",
    },
  });
  return res.data;
}
