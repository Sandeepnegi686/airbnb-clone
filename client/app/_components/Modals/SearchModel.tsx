"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import useSearchModel from "@/app/_hooks/useSearchModel";
import Model from "./Model";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "querystring";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../Inputs/Calender";
import Counter from "../Inputs/Counter";

enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModel() {
  const searchModel = useSearchModel();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEP.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("@/app/_components/Map"), { ssr: false }),
    [location],
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEP.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const queryString = qs.stringify(updatedQuery);
    setStep(STEP.LOCATION);
    searchModel.setClose();
    router.push(`/?${queryString}`);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModel,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEP.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.LOCATION) {
      return undefined;
    }
    return "BACK";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <div className="h-px rounded-full bg-neutral-200"></div>
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEP.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
        />
      </div>
    );
  }

  return (
    <Model
      isOpen={searchModel.isOpen}
      onClose={searchModel.setClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEP.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
}
