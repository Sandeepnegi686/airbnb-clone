import getCurrentUser from "../_actions/getCurrentUser";

import getListingsByUserId from "../_actions/getListingsByUserId";
import EmptyState from "../_components/EmptyState";
import PropertyClient from "./PropertyClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
    );
  }
  const listings = await getListingsByUserId();
  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      ></EmptyState>
    );
  }
  return <PropertyClient listings={listings} currentUser={currentUser} />;
};

export default TripsPage;
