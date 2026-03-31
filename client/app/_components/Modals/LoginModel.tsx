"use client";
import useLoginModel from "@/app/_hooks/useLoginModal";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import BASE_API_URL from "@/app/lib/api";
import RegisterModel from "@/app/_hooks/useRegisterModal";

export default function LoginModel() {
  const router = useRouter();
  const { isOpen, setClose } = useLoginModel();
  const registerModel = RegisterModel();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (detail) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        body: JSON.stringify(detail),
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success("Logged In");
        setClose();
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  async function googleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/google`;
  }

  const toggle = useCallback(() => {
    registerModel.setOpen();
    setClose();
  }, [registerModel, setClose]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
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
        onClick={googleLogin}
      />
      <div className="text-center text-neutral-500 mt-4 font-light">
        <div className="text-center flex items-center justify-center gap-2">
          <div>First time using Airbnb?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      onClose={setClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
    />
  );
}
