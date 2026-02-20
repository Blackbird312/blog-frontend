"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginButton() {
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl") || "/";

  return (
    <Button
      variant="contained"
      onClick={() => signIn("keycloak", { callbackUrl })}
    >
      Continue with Keycloak
    </Button>
  );
}
