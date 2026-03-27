import { NextRequest } from "next/server";
import BASE_API_URL from "@/app/lib/api";
import { cookies } from "next/headers";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ listingId: string }> },
) {
  try {
    // ✅ cookies() is synchronous
    const cookieStore = cookies();

    const token = (await cookieStore).get("access-token");

    if (!token) {
      return Response.json({ success: false }, { status: 401 });
    }

    // ✅ params is a Promise → must await
    const { listingId } = await context.params;

    if (!listingId) {
      return Response.json({ success: false }, { status: 400 });
    }

    const response = await fetch(
      `${BASE_API_URL}/api/v1/listing/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `access-token=${token.value}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("DELETE listing error:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
