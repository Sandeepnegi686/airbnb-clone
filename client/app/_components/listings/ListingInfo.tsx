import useCountries from "@/app/_hooks/useCountries";
import { UserType } from "@/app/_types/UserType";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/_components/Map"), { ssr: false });

interface ListingInfoProps {
  user: UserType;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  location: string;
}

export default function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  location,
}: ListingInfoProps) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(location)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div> Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <div className="h-px w-full bg-gray-100 rounded-full"></div>
      {category && <ListingCategory category={category} />}
      <div className="h-px w-full bg-gray-100 rounded-full"></div>
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <div className="h-px w-full bg-gray-100 rounded-full"></div>
      <Map center={coordinates} />
    </div>
  );
}
