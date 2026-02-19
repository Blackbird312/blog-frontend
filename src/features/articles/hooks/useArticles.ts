import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/articles.public";

type UseArticlesParams = {
  q?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export function useArticles(params?: UseArticlesParams) {
  const {
    q,
    page = 0,
    size = 6,
    sort = "createdAt,desc",
  } = params ?? {};

  return useQuery({
    queryKey: ["articles", { q, page, size, sort }],
    queryFn: () =>
      fetchArticles({
        q,
        page,
        size,
        sort,
      }),
  });
}
