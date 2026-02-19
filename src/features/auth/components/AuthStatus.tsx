"use client";

import { Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import UserMenu from "./UserMenu";

export default function AuthStatus() {
  const { status } = useSession();

  if (status === "authenticated") return <UserMenu />;

  return (
    <Button variant="outlined" onClick={() => signIn("keycloak", { callbackUrl: "/dashboard" })}>
      Login
    </Button>
  );
}
