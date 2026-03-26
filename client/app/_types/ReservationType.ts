import { ListingType } from "./ListType";

export interface ReservationType {
  _id?: string;
  userId: string;
  listingId: string | ListingType;
  startDate?: Date;
  endDate?: Date;
  totalPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
