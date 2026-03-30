import { cookies } from "next/headers";
import { UserType } from "../_types/UserType";
import BASE_API_URL from "../lib/api";

async function getCurrentUser(): Promise<UserType | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;
  let currentUser = null;

  if (token) {
    const res = await fetch(`${BASE_API_URL}/api/v1/auth/me`, {
      headers: {
        Cookie: `access-token=${token}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    currentUser = data.user;
  }
  return currentUser;
}

export default getCurrentUser;
