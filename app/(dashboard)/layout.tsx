import { Box, Container, Typography } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(); // guaranteed by middleware, but useful for SSR data
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={800}>
                    Dashboard
                </Typography>
                <Typography color="text.secondary">
                    Signed in as {session?.user?.email ?? session?.user?.name ?? "user"}
                </Typography>
            </Box>
            {children}
        </Container>
    );
}
