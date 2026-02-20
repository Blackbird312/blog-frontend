import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCommentsBySlug, postComment } from "../api/comments.public";

export function useComments(slug: string, params?: { page?: number; size?: number }) {
  const page = params?.page ?? 0;
  const size = params?.size ?? 20;

  return useQuery({
    queryKey: ["comments", { slug, page, size }],
    queryFn: () => fetchCommentsBySlug(slug, { page, size }),
    enabled: !!slug,
    staleTime: 15_000,
  });
}

export function usePostComments(articleSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => postComment(articleSlug, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", { slug: articleSlug }] });
    },
  })
}
