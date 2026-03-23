"use client";
import Container from "@/app/_components/Container";
import { categories } from "@/app/_components/Navbar/Categories";
import { ListingType } from "@/app/_types/ListType";
import { ReservationType } from "@/app/_types/ReservationType";
import { UserType } from "@/app/_types/UserType";
import { useMemo } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClient {
  listing: ListingType;
  reservation?: ReservationType[];
  currentUser: UserType | null;
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
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing?.userId as UserType}
              category={category}
              description={listing?.description}
              roomCount={listing?.roomCount}
              guestCount={listing?.guestCount}
              bathroomCount={listing?.bathroomCount}
              location={listing?.location}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
