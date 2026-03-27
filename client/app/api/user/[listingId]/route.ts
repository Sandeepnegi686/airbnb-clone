import BASE_API_URL from "@/app/lib/api";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  context: { params: Promise<{ listingId: string }> },
) {
  const listingId = (await context.params)?.listingId;
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;
  if (!listingId || typeof listingId !== "string") {
    return Response.json(
      { success: false, message: "Invalid params" },
      { status: 400 },
    );
  }
  if (!token) {
    return Response.json(
      { success: false, message: "Access Denied" },
      { status: 400 },
    );
  }
  const response = await fetch(`${BASE_API_URL}/api/v1/user/addFavroite`, {
    headers: {
      Cookie: `access-token=${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ listingId }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Response.json(data, { status: response.status });
  }
  return Response.json(data, { status: response.status });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ listingId: string }> },
) {
  const listingId = (await context.params)?.listingId;
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;
  if (!listingId || typeof listingId !== "string") {
    return Response.json(
      { success: false, message: "Invalid params" },
      { status: 400 },
    );
  }
  if (!token) {
    return Response.json(
      { success: false, message: "Access Denied" },
      { status: 400 },
    );
  }
  const response = await fetch(`${BASE_API_URL}/api/v1/user/removeFavroite`, {
    headers: {
      Cookie: `access-token=${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
    body: JSON.stringify({ listingId }),
  });

  const data = await response.json();

  if (!response.ok) {
    return Response.json(data, { status: response.status });
  }
  return Response.json(data, { status: response.status });
}
