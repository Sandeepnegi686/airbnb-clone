import { ListingType } from "../_types/ListType";
import BASE_API_URL from "../lib/api";

interface QueryParams {
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: Date;
  endDate?: Date;
  locationValue?: string;
  category?: string;
}

async function getListings(searchParams: QueryParams): Promise<ListingType[]> {
  if (searchParams.startDate) {
    searchParams.startDate = new Date(searchParams.startDate);
  }
  if (searchParams.endDate) {
    searchParams.endDate = new Date(searchParams.endDate);
  }

  let urlString = "";
  for (const key in searchParams) {
    urlString += `&${key}=${searchParams[key as keyof QueryParams]}`;
  }
  const url = `${BASE_API_URL}/api/v1/listing/getAllListing?${urlString}`;
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.listings;
}

export default getListings;
