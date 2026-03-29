import { cookies } from "next/headers";
import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

async function getListingsByUserId(): Promise<ListingType[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  const url = `${BASE_API_URL}/api/v1/listing/getAllListingOfUser`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `access-token=${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return data.listings;
}

export default getListingsByUserId;
