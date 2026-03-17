"use client";
import useRegisterModel from "@/app/_hooks/useRegisterModal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";

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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <div className="text-center text-neutral-500 mt-4 font-light">
        <div className="text-center flex items-center justify-center gap-2">
          <div>Already have an accound?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={setClose}
          >
            Log in
          </div>
        </div>
      </div>
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
      footer={footerContent}
    />
  );
}
