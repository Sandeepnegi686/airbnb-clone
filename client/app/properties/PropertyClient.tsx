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

interface PropertiesClientProps {
  listings: ListingType[];
  currentUser: UserType | null;
}
export default function PropertyClient({
  listings,
  currentUser,
}: PropertiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      const response = await fetch(`/api/listing/${id}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Listings Deleted");
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing._id}
            currentUser={currentUser}
            data={listing}
            actionId={listing._id}
            onAction={onCancel}
            disabled={deletingId === listing._id}
            actionLabel="Delete Property"
          />
        ))}
      </div>
    </Container>
  );
}
