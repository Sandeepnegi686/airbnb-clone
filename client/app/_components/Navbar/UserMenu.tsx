"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";

import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/_hooks/useRegisterModal";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(function () {
    setIsOpen((value) => !value);
  }, []);

  const registerModel = useRegisterModel();

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:p-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Login" onClick={() => {}} />
              <MenuItem label="SignUp" onClick={registerModel.setOpen} />
            </>
          </div>
        </div>
      )}
    </div>
  );
}
