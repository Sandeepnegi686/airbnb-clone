"use client";

import { useRouter } from "next/navigation";
import { UserType } from "../_types/UserType";
import useLoginModel from "@/app/_hooks/useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUseFavouriteType {
  listingId: string;
  currentUser: UserType | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavouriteType) => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const hasFavrouite = useMemo(() => {
    const list = currentUser?.favoriteIds;
    return list?.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        loginModel.setOpen();
        return;
      }
      const response = await fetch(`/api/user/${listingId}`, {
        credentials: "include",
        method: hasFavrouite ? "DELETE" : "POST",
        cache: "no-cache",
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(data.message);
      }
    },
    [currentUser, hasFavrouite, listingId, loginModel, router],
  );

  return { toggleFavourite, hasFavrouite };
};

export { useFavorite };
