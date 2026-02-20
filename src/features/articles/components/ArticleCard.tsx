"use client";

import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import type { Article } from "../api/articles.public";
import CreateArticleButton from "./CreateArticleButton";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Card variant="outlined">
      <CardActionArea component={Link} href={`/articles/${article.slug}`}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
            {article.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
            }}
          >
            {article.content}
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
            {new Date(article.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
