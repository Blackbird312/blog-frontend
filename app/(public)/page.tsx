"use client";

import React from "react";
import Link from "next/link";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useArticles } from "@/src/features/articles/hooks/useArticles";

export default function HomePage() {
  const { data, isLoading, isError, error } = useArticles({ page: 0, size: 6 });

  if (isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        {(error as Error)?.message ?? "Failed to load articles"}
      </Alert>
    );
  }

  const items = data?.content ?? [];

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={800}>
        Latest Articles
      </Typography>

      <Grid container spacing={2}>
        {items.map((a) => (
          <Grid key={a.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined">
              <CardActionArea component={Link} href={`/articles/${a.slug}#comments`}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
                    {a.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {a.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Author : {a.author.fullName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
                    {new Date(a.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
