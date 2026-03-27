import { cookies } from "next/headers";
import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

export interface getListingProps {
  userId?: string;
}

async function getListings({
  userId = "",
}: getListingProps): Promise<ListingType[]> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;
  const url = userId
    ? `${BASE_API_URL}/api/v1/listing/getAllListingOfUser`
    : `${BASE_API_URL}/api/v1/listing/getAllListing`;
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

export default getListings;
