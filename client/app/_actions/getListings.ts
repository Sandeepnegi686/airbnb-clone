import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

export interface IListingParams {
  userId?: string;
}

async function getListings({
  userId = "",
}: IListingParams): Promise<ListingType[] | null> {
  let query: any = {};
  if (userId) {
    query.userId = userId;
  }
  const res = await fetch(`${BASE_API_URL}/api/v1/listing/getAllListing`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.listings;
}

export default getListings;
