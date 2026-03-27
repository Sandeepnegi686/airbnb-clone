import React from "react";
import { ListingType } from "../_types/ListType";
import { UserType } from "../_types/UserType";
import Container from "../_components/Container";
import Heading from "../_components/Heading";
import ListingCard from "../_components/ListingCard";

interface FavoritesClientProps {
  listings: ListingType[];
  currentUser: UserType;
}

export default function FavoritesClient({
  listings,
  currentUser,
}: FavoritesClientProps) {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing._id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}
