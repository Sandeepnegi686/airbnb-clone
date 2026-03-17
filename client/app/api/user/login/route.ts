import BASE_API_URL from "@/app/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const response = await fetch(`${BASE_API_URL}/`);
}
