import getListingById from "@/app/_actions/getListingById";
import EmptyState from "@/app/_components/EmptyState";
import ListingClient from "../../_components/listings/ListingClient";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import getReservations from "@/app/_actions/getReservations";

export default async function Page({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const listingId = (await params).listingId;
  const [listing, currentUser, reservations] = await Promise.all([
    getListingById(listingId),
    getCurrentUser(),
    getReservations({ listingId }),
  ]);
  if (!listing) return <EmptyState />;
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
