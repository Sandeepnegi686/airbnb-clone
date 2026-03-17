export interface UserType {
  _id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  publicImageId?: string;
  favoriteIds: string[];
  reservations: string[];
  createdAt: Date;
  updatedAt: Date;
}
