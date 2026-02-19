import { useQuery } from "@tanstack/react-query";
import { fetchArticleBySlug } from "../api/articles.public";

export function useArticle(slug?: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug!),
    enabled: !!slug, // prevents execution until slug exists
  });
}