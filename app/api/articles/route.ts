
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function hasAnyRole(roles: string[] | undefined, allowed: string[]) {
  if (!roles) return false;
  return roles.some((r) => allowed.includes(r));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  console.log("🚀 ~ POST ~ session:", session);
  if (!session?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!hasAnyRole(session.roles, ["AUTHOR", "ADMIN"])) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const res = await fetch(`${API_BASE}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      // Cookie: cookies().toString(),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}