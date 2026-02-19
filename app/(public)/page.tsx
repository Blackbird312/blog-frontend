// app/(public)/page.tsx
import { Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Blog
      </Typography>

      <Typography color="text.secondary">
        Discover the latest articles written by our authors.
      </Typography>
    </Container>
  );
}