"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { useArticles } from "@/src/features/articles/hooks/useArticles";
import ArticleCard from "@/src/features/articles/components/ArticleCard";
import CreateArticleButton from "@/src/features/articles/components/CreateArticleButton";

export default function ArticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const qFromUrl = searchParams?.get("q") ?? "";
  const [q, setQ] = React.useState(qFromUrl);

  // keep input in sync when user navigates back/forward
  React.useEffect(() => setQ(qFromUrl), [qFromUrl]);

  const articlesQ = useArticles({
    q: qFromUrl || undefined,
    page: 0,
    size: 9,
    sort: "createdAt,desc",
  });

  function onSearch() {
    const trimmed = q.trim();
    const params = new URLSearchParams(searchParams?.toString());

    if (trimmed) params.set("q", trimmed);
    else params.delete("q");

    // optional: reset pagination when searching
    params.delete("page");

    router.push(`/articles?${params.toString()}`);
  }

  function onClear() {
    setQ("");
    router.push("/articles");
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={800}>
        Articles
      </Typography>
      <CreateArticleButton />
      {/* Search bar */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          fullWidth
          label="Search"
          placeholder="Search title or content..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />
        <Button variant="contained" onClick={onSearch}>
          Search
        </Button>
        <Button variant="text" onClick={onClear}>
          Clear
        </Button>
      </Stack>

      {/* Results */}
      {articlesQ.isLoading ? (
        <Stack alignItems="center" sx={{ py: 6 }}>
          <CircularProgress />
        </Stack>
      ) : articlesQ.isError ? (
        <Alert severity="error">
          {(articlesQ.error as Error)?.message ?? "Failed to load articles"}
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {(articlesQ.data?.content ?? []).map((a) => (
            <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ArticleCard article={a} />
            </Grid>
          ))}

        </Grid>
      )}
    </Stack>
  );
}
