import BASE_API_URL from "@/app/lib/api";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ reservationId: string }> },
) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token");
  if (!token) {
    return Response.json({ sucess: false }, { status: 401 });
  }
  const { reservationId } = await context.params;
  if (!reservationId) {
    return Response.json({ sucess: false }, { status: 401 });
  }
  const response = await fetch(
    `${BASE_API_URL}/api/v1/reservation/${reservationId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `access-token=${token?.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );
  const data = await response.json();
  return Response.json(data, { status: 401 });
}
