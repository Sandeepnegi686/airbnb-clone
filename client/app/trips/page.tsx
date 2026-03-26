import getCurrentUser from "../_actions/getCurrentUser";
import getReservations from "../_actions/getReservations";
import EmptyState from "../_components/EmptyState";
import TripsClinet from "./TripsClinet";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
    );
  }
  const reservations = await getReservations({ userId: currentUser?._id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips"
      ></EmptyState>
    );
  }
  return <TripsClinet reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
