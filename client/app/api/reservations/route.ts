import BASE_API_URL from "@/app/lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");
  const response = await fetch(`${BASE_API_URL}/api/v1/reservation/create`, {
    method: "POST",
    headers: {
      Cookie: `access-token=${token?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return Response.json(data, { status: response.status });
}
