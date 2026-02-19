import "server-only";
import axios, { AxiosError, AxiosInstance } from "axios";
import { getServerSession } from "next-auth";


const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function createAxiosClient(): Promise<AxiosInstance> {
  const session = await getServerSession();
  const accessToken = session?.accessToken;

  const client = axios.create({
    baseURL: API_BASE,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach Bearer token (BFF)
  if (accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  // Response interceptor (optional but recommended)
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      const message =
        (error.response?.data as any)?.message ||
        error.message ||
        "API error";
      throw new Error(`API ${status}: ${message}`);
    }
  );

  return client;
}

export async function apiClient() {
  return createAxiosClient();
}
