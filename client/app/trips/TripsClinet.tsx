"use client";
import { useRouter } from "next/navigation";
import Container from "../_components/Container";
import Heading from "../_components/Heading";
import { ReservationType } from "../_types/ReservationType";
import { UserType } from "../_types/UserType";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "../_components/ListingCard";
import { ListingType } from "../_types/ListType";

interface TripsClientProps {
  reservations: ReservationType[];
  currentUser: UserType | null;
}
export default function TripsClinet({
  reservations,
  currentUser,
}: TripsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      // fetch(`/api/reservations/${id}`);
      toast.success("Reservation cancelled");
      router.refresh();
      toast.error("Something went wrong");
      setDeletingId("");
    },
    [router],
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where your're goind"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation._id}
            currentUser={currentUser}
            data={reservation.listingId as ListingType}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
}
