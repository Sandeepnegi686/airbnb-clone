"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { UserType } from "../_types/UserType";
import { useFavorite } from "../_hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser: UserType | null;
}

export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps) {
  const { hasFavrouite, toggleFavourite } = useFavorite({
    currentUser,
    listingId,
  });
  return (
    <div
      onClick={toggleFavourite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-1 -right-1"
      />
      <AiFillHeart
        size={24}
        className={`${hasFavrouite ? "fill-rose-500" : "fill-neutral-500/70"} absolute -top-0.5 -right-0.5`}
      />
    </div>
  );
}
