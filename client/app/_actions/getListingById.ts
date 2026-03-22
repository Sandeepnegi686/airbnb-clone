import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

async function getListingById(listingId: string): Promise<ListingType | null> {
  const res = await fetch(
    `${BASE_API_URL}/api/v1/listing/getListingById/${listingId}`,
  );
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (data.success) {
    return data.listing;
  } else {
    return null;
  }
}

export default getListingById;
