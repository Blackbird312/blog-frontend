"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

type CreateArticlePayload = {
  title: string;
  content: string;
  published: boolean;
};

export default function NewArticlePage() {
  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [published, setPublished] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: CreateArticlePayload = {
      title: title.trim(),
      content: content.trim(),
      published,
    };

    if (!payload.title || !payload.content) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message ?? "Create article failed");
      }

      // If your backend returns the created article with slug:
      const slug = data?.slug;
      if (slug) router.push(`/articles/${slug}`);
      else router.push("/articles");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Create Article
        </Typography>
        <Typography color="text.secondary">
          Fill the form and publish when ready.
        </Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Stack component="form" spacing={2} onSubmit={onSubmit}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
              multiline
              minRows={8}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              }
              label="Published"
            />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="text"
                onClick={() => router.push("/articles")}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : "Create"}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}