"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import useSearchModel from "@/app/_hooks/useSearchModel";
import Model from "./Model";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "querystring";
import { CountrySelectValue } from "../Inputs/CountrySelect";
import { formatISO } from "date-fns";
import { url } from "inspector";

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
      updatedQuery.startDate = formatISO(dateRange.endDate);
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
  });
  const secondaryAci;

  return (
    <Model
      isOpen={searchModel.isOpen}
      onClose={searchModel.setClose}
      onSubmit={searchModel.setOpen}
      title="Filters"
      actionLabel="Submit"
    />
  );
}
