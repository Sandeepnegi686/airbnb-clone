import BASE_API_URL from "@/app/lib/api";
import { cookies } from "next/headers";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");
  if (!token) {
    return Response.json({ sucess: false }, { status: 401 });
  }
  const listingId = (await params)?.listingId;
  if (!listingId) {
    return Response.json({ sucess: false }, { status: 401 });
  }
  const response = await fetch(`${BASE_API_URL}/api/v1/listing/${listingId}`, {
    method: "DELETE",
    headers: {
      Cookie: `access-token=${token?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  return Response.json(data, { status: 401 });
}
