import { UserType } from "./UserType";

export interface ListingType {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: string;
  price: number;
  userId: string | UserType;
  reservations?: string[];
  createdAt: Date;
  updatedAt: Date;
}
