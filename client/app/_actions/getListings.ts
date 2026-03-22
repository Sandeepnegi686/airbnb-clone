import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

async function getListings(): Promise<ListingType[] | null> {
  const res = await fetch(`${BASE_API_URL}/api/v1/listing/getAllListing`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.listings;
}

export default getListings;
