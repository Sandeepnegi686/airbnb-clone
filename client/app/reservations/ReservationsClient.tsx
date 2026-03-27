"use client";
import { useRouter } from "next/navigation";
import Container from "../_components/Container";
import Heading from "../_components/Heading";
import { ReservationType } from "../_types/ReservationType";
import { UserType } from "../_types/UserType";
import { useCallback, useState } from "react";
import ListingCard from "../_components/ListingCard";
import { ListingType } from "../_types/ListType";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  reservations: ReservationType[];
  currentUser: UserType;
}

export default function ReservationsClient({
  reservations,
  currentUser,
}: ReservationsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      const response = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Reservation cancelled");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
      setDeletingId("");
    },
    [router],
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation._id}
            data={reservation.listingId as ListingType}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
