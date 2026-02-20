"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

function hasAnyRole(roles: string[] | undefined, allowed: string[]) {
  if (!roles) return false;
  return roles.some((r) => allowed.includes(r));
}

export default function CreateArticleButton() {
  const { data } = useSession();
  console.log("🚀 ~ CreateArticleButton ~ data:", data)
  const roles = data?.roles;  
  console.log("🚀 ~ CreateArticleButton ~ roles:", roles)

  // if (!hasAnyRole(roles, ["AUTHOR", "ADMIN"])) return null;

  return (
    <Button variant="contained" component={Link} href="/dashboard/articles/new">
      Create Article
    </Button>
  );
}