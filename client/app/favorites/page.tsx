import getCurrentUser from "../_actions/getCurrentUser";
import getFavoriteListings from "../_actions/getFavoriteListing";
import EmptyState from "../_components/EmptyState";
import { ListingType } from "../_types/ListType";
import { UserType } from "../_types/UserType";
import FavoritesClient from "./FavoritesClient";

export default async function Page() {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  if (listings?.length === 0)
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    );

  return (
    <FavoritesClient
      listings={listings as ListingType[]}
      currentUser={currentUser as UserType}
    />
  );
}
