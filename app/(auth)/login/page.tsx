import { Container, Stack, Typography } from "@mui/material";
import LoginButton from "@/src/features/auth/components/LoginButton";

export default function LoginPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          Sign in
        </Typography>
        <Typography color="text.secondary">
          Use Keycloak to access the dashboard and create articles.
        </Typography>
        <LoginButton />
      </Stack>
    </Container>
  );
}
