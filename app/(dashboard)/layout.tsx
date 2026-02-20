import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Box, Container, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { hasAnyRole } from "../api/articles/route";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    const role = hasAnyRole(session?.roles, ["AUTHOR"]) ? "AUTHOR" : hasAnyRole(session?.roles, ["ADMIN"]) ? "ADMIN" : "READER";
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={800}>
                    Dashboard
                </Typography>
                <Typography color="text.secondary">
                    Signed in as {session?.user?.email ?? session?.user?.name}
                </Typography>
                <Typography color="text.secondary">Role: {role ?? "none"}</Typography>
            </Box>
            {children}
        </Container>
    );
}
