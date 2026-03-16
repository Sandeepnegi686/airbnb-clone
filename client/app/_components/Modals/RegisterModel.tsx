"use client";
import useRegisterModel from "@/app/_hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "./Model";

export default function RegisterModel() {
  const { isOpen, setClose } = useRegisterModel();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/register", {
      body: JSON.stringify(data),
      method: "POST",
      credentials: "include",
    });
    setClose();
    setIsLoading(false);
  };

  const bodyContent = <div className="flex flex-col gap-4"></div>;

  return (
    <Model
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      body={bodyContent}
      onClose={setClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
