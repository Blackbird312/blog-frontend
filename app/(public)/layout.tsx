import AuthStatus from "@/src/features/auth/components/AuthStatus";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/" >
              <Typography

                variant="h6"
                sx={{ textDecoration: "none", color: "inherit", fontWeight: 800 }}
              >
                Blog
              </Typography>
            </Link>
            <Box sx={{ flex: 1 }} />
            <AuthStatus />
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </>
  );
}
