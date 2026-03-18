"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthHandler() {
  const router = useRouter();
  const params = useSearchParams();

  async function getCookies(token: string) {
    await fetch(`/api/user/currentUser`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Login Successfull");
  }

  useEffect(() => {
    const token = params.get("access-token");

    if (!token) return;

    getCookies(token);

    router.push("/");
  }, [params, router]);
  return <div></div>;
}
