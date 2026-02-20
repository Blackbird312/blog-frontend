"use client";

import { useParams } from "next/navigation";
import { Alert, CircularProgress, Stack, Typography, Divider } from "@mui/material";
import { useArticle } from "@/src/features/articles/hooks/useArticle";
import { useComments } from "@/src/features/comments/hooks/useComments";
import CommentList from "@/src/features/comments/components/CommentsList";
import PostCommentForm from "@/src/features/comments/components/CreateComment";


export default function ArticleDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const articleQ = useArticle(slug);
  const commentsQ = useComments(slug);

  if (articleQ.isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (articleQ.isError || !articleQ.data) {
    return (
      <Alert severity="error">
        {(articleQ.error as Error)?.message ?? "Article not found"}
      </Alert>
    );
  }

  // ✅ TypeScript now KNOWS article exists
  const article = articleQ.data;

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={800}>
        {article.title}
      </Typography>

      <Typography color="text.secondary">
        {new Date(article.createdAt).toLocaleString()}
      </Typography>

      <Typography sx={{ whiteSpace: "pre-wrap" }}>
        {article.content}
      </Typography>

      <Divider />

      <div id="comments" />

      <Typography variant="h5" fontWeight={800}>
        Comments
      </Typography>

      <PostCommentForm articleSlug={slug} />

      <CommentList
        loading={commentsQ.isLoading}
        error={commentsQ.isError ? (commentsQ.error as Error) : null}
        comments={commentsQ.data?.content ?? []}
      />
    </Stack>
  );
}
