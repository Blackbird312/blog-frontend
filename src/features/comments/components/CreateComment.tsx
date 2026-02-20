"use client";

import * as React from "react";
import { Alert, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { usePostComments } from "../hooks/useComments";

type Props = {
  articleSlug: string;
};

export default function PostCommentForm({ articleSlug }: Props) {
  const [content, setContent] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);

  const postCommentM = usePostComments(articleSlug);

  const isDisabled =
    postCommentM.isPending || content.trim().length === 0 || content.trim().length > 2000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    const trimmed = content.trim();
    if (!trimmed) return;

    try {
      await postCommentM.mutateAsync(trimmed);
      setContent("");
      // optional: jump to the list
      document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setLocalError((err as Error)?.message ?? "Failed to post comment");
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      {(localError || postCommentM.isError) && (
        <Alert severity="error">
          {localError ?? (postCommentM.error as Error)?.message ?? "Failed to post comment"}
        </Alert>
      )}

      {postCommentM.isSuccess && (
        <Alert severity="success">Comment posted.</Alert>
      )}

      <TextField
        label="Write a comment"
        placeholder="Be respectful…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        minRows={3}
        inputProps={{ maxLength: 2000 }}
        helperText={`${content.trim().length}/2000`}
      />

      
      {postCommentM.isPending ? (
        <CircularProgress size={22} />
      ) : <Button
        type="submit"
        variant="contained"
        loading={postCommentM.isPending}
        disabled={isDisabled}
      >
        Post comment
      </Button>}
    </Stack>
  );
}