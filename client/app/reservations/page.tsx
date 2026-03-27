import EmptyState from "../_components/EmptyState";
import getCurrentUser from "../_actions/getCurrentUser";
import getReservations from "../_actions/getReservations";

import ReservationsClient from "./ReservationsClient";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
    );
  }

  const reservations = await getReservations({ authorId: currentUser._id });

  if (reservations.length == 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      ></EmptyState>
    );
  }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
