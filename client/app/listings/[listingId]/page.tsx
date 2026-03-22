import getListingById from "@/app/_actions/getListingById";
import EmptyState from "@/app/_components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/_actions/getCurrentUser";

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const listingId = (await params).listingId;
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return <ListingClient listing={listing} currentUser={currentUser} />;
}
