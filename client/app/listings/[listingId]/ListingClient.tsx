"use client";
import Container from "@/app/_components/Container";
import { categories } from "@/app/_components/Navbar/Categories";
import { ListingType } from "@/app/_types/ListType";
import { ReservationType } from "@/app/_types/ReservationType";
import { UserType } from "@/app/_types/UserType";
import { useMemo } from "react";
import ListingHead from "./ListingHead";

interface ListingClient {
  listing: ListingType;
  reservation?: ReservationType[];
  currentUser?: UserType | null;
}

export default function ListingClient({ listing, currentUser }: ListingClient) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);
  return (
    <Container>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.location}
            id={listing._id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
}
