import { UserType } from "@/app/_types/UserType";
import useCountries from "@/app/_hooks/useCountries";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: UserType | null | undefined;
}

export default function ListingHead({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  console.log(location);
  return <div></div>;
}
