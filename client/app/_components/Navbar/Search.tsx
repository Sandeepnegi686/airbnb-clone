"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModel from "@/app/_hooks/useSearchModel";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/_hooks/useCountries";
import { useMemo } from "react";
import { difference } from "next/dist/build/utils";
import { differenceInDays } from "date-fns";

export default function Search() {
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const searchModel = useSearchModel();

  const location = params?.get("location");
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const locationLabel = useMemo(() => {
    if (location) {
      return getByValue(location)?.label;
    }
    return "Anywhere";
  }, [getByValue, location]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff == 0) diff = 1;
      return `${diff} Days`;
    }
    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="border border-gray-100 w-full md:w-auto rounded-full py-2 shadow-md hover:shadow-md transition cursor-pointer"
      onClick={searchModel.setOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x border-gray-100 flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
