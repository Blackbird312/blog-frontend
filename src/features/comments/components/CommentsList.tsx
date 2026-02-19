"use client";

import { Alert, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import type { Comment } from "../api/comments.public";

export default function CommentList({
    comments,
    loading,
    error,
}: {
    comments: Comment[];
    loading: boolean;
    error: Error | null;
}) {
    if (loading) {
        return (
            <Stack alignItems="center" sx={{ py: 2 }}>
                <CircularProgress size={22} />
            </Stack>
        );
    }

    if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

    if (comments.length === 0) {
        return <Typography color="text.secondary">No comments yet.</Typography>;
    }

    return (
        <Stack spacing={2}>
            {comments.map((c) => (
                <Card key={c.id} variant="outlined">
                    <CardContent>
                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                            User : {c.author.fullName}
                        </Typography>
                        <Typography sx={{ whiteSpace: "pre-wrap" }}>
                            Comment : {c.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                            {new Date(c.createdAt).toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}
