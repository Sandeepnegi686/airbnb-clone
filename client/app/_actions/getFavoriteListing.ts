import { cookies } from "next/headers";
import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

async function getFavoriteListings(): Promise<ListingType[] | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;
  if (!token) return [];
  const res = await fetch(
    `${BASE_API_URL}/api/v1/listing/getFavoriteListings`,
    {
      method: "GET",
      headers: {
        Cookie: `access-token=${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.listings;
}

export default getFavoriteListings;
