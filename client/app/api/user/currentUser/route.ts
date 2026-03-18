import BASE_API_URL from "@/app/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  console.log("hello");
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");
  const response = await fetch(`${BASE_API_URL}/api/v1/auth/me`, {
    cache: "no-store",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });
  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
