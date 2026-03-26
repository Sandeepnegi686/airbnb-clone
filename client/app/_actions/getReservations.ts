import { cookies } from "next/headers";
import BASE_API_URL from "../lib/api";
import { ReservationType } from "../_types/ReservationType";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams,
): Promise<ReservationType[]> {
  let url = "";
  if (params?.listingId) {
    url = `${BASE_API_URL}/api/v1/reservation/get-reservation-by-listingId/${params?.listingId}`;
  } else if (params?.userId) {
    url = `${BASE_API_URL}/api/v1/reservation/get-reservation-by-userId/${params?.userId}`;
  }
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;
  if (!token) return [];
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `access-token=${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await response.json();
  if (!data.success) {
    return [];
  } else {
    return data.reservations;
  }
}
