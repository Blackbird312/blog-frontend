import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type Article = {
  id: string;
  authorId: string;
  author:{
    id: string;
    fullName: string;
  },
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page
};

export async function fetchArticles(params?: {
  q?: string;
  page?: number;
  size?: number;
  sort?: string; // e.g. "createdAt,desc"
}) {
    
    console.log("🚀 ~ fetchArticles ~ API_BASE:", API_BASE)
    const res = await axios.get<PageResponse<Article>>(`${API_BASE}/articles`, {
    params: {
      q: params?.q,
      page: params?.page ?? 0,
      size: params?.size ?? 6,
      sort: params?.sort ?? "createdAt,desc",
    },
  });
  return res.data;
}


export async function fetchArticleBySlug(slug: string) {
  const res = await axios.get<Article>(`${API_BASE}/articles/${slug}`);
  return res.data;
}

export async function postArticle(title: string, content: string) {
  const res = await axios.post(`${API_BASE}/articles`, { title, content });
  return res.data;
}
