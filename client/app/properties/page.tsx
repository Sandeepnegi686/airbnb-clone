import getCurrentUser from "../_actions/getCurrentUser";
import getListings from "../_actions/getListings";
import EmptyState from "../_components/EmptyState";
import PropertyClient from "./PropertyClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
    );
  }
  const listings = await getListings({ userId: currentUser?._id });
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
