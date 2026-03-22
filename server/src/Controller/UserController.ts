import { Request, Response } from "express";
import { Types } from "mongoose";
import UserModel from "../Model/UserModel";
import { APIError } from "../middleware/errorHandler";

async function addListingToFav(
  req: Request<{}, {}, { listingId: string }>,
  res: Response,
) {
  try {
    const listingId = req.body?.listingId;
    if (!listingId || !Types.ObjectId.isValid(listingId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid listing ID" });
    }
    let userId = req.user_!._id;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favoriteIds: listingId },
      },
      { returnDocument: "after" },
    );
    return res.status(201).json({ success: true, message: "List Added", user });
  } catch (error) {
    console.log(error);
    throw new APIError("Something went wrong while creting listing", 500);
  }
}

async function removeListingFromFav(
  req: Request<{}, {}, { listingId: string }>,
  res: Response,
) {
  try {
    const listingId = req.body?.listingId;
    if (!listingId || !Types.ObjectId.isValid(listingId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid listing ID" });
    }
    let userId = req.user_!._id;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { favoriteIds: listingId },
      },
      { returnDocument: "after" },
    );
    return res
      .status(201)
      .json({ success: true, message: "List Removed", user });
  } catch (error) {
    console.log(error);
    throw new APIError("Something went wrong while creting listing", 500);
  }
}

export { addListingToFav, removeListingFromFav };
