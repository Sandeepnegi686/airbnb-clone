"use client";
import { useCallback, useMemo, useState } from "react";
import useLoginModel from "@/app/_hooks/useLoginModal";
import Container from "@/app/_components/Container";
import { categories } from "@/app/_components/Navbar/Categories";
import { ListingType } from "@/app/_types/ListType";
import { ReservationType } from "@/app/_types/ReservationType";
import { UserType } from "@/app/_types/UserType";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

interface ListingClient {
  listing: ListingType;
  reservations?: ReservationType[];
  currentUser: UserType | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export default function ListingClient({
  listing,
  reservations = [],
  currentUser,
}: ListingClient) {
  const router = useRouter();
  const LoginModel = useLoginModel();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation: ReservationType) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate ?? 0),
        end: new Date(reservation.endDate ?? 0),
      });
      dates = [...dates, ...range];
      return dates;
    });
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const totalPrice = useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );
      if (dayCount && listing.price) {
        return dayCount * listing.price;
      }
    }
    return listing.price;
  }, [dateRange, listing.price]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      LoginModel.setOpen();
      return;
    }
    setIsLoading(true);
    // fetch()
    toast.success("Listing reserved");
    setDateRange(initialDateRange);
    router.refresh();
    setIsLoading(false);
  }, [LoginModel, currentUser, totalPrice, dateRange, listing?._id, router]);

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates!}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
