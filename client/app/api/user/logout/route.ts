import BASE_API_URL from "@/app/lib/api";

export async function DELETE() {
  const response = await fetch(`${BASE_API_URL}/api/v1/auth/logout`, {
    cache: "no-store",
    method: "DELETE",
  });
  const cookie = response.headers.get("set-cookie");

  if (!response.ok) {
    return Response.json(null, { status: response.status });
  }
  const data = await response.json();
  return Response.json(data, {
    status: response.status,
    headers: {
      "Set-Cookie": cookie || "",
    },
  });
}
