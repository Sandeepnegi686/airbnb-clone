"use client";
import useRegisterModel from "@/app/_hooks/useRegisterModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";

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
    try {
      const res = await fetch("/api/register", {
        body: JSON.stringify(data),
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP error. Status code: ${res.status}`);
      }
      setClose();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        register={register}
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        register={register}
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

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
