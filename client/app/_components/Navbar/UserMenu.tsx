"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";

import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/_hooks/useRegisterModal";
import useLoginModel from "@/app/_hooks/useLoginModal";
import useRentModel from "@/app/_hooks/useRentModal";
import { UserType } from "@/app/_types/UserType";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: UserType | null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleOpen = useCallback(function () {
    setIsOpen((value) => !value);
  }, []);

  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const rentModel = useRentModel();

  const handleLogout = useCallback(async () => {
    await fetch("/api/user/logout", {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    });
    router.refresh();
  }, [router]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModel.setOpen();
      return;
    }
    //Open Rent Model
    rentModel.setOpen();
  }, [currentUser, loginModel, rentModel]);

  const handleChangeRoute = useCallback(
    (url: string) => {
      router.push(url);
      toggleOpen();
    },
    [router, toggleOpen],
  );

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:p-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => handleChangeRoute("/trips")}
                />
                <MenuItem
                  label="My Favorites"
                  onClick={() => handleChangeRoute("/favorites")}
                />
                <MenuItem
                  label="My Reservations"
                  onClick={() => handleChangeRoute("/reservations")}
                />
                <MenuItem label="My Properties" onClick={() => {}} />
                <MenuItem label="Airbnb my home" onClick={rentModel.setOpen} />
                <hr />
                <MenuItem label="Logout" onClick={handleLogout} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModel.setOpen} />
                <MenuItem label="SignUp" onClick={registerModel.setOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
