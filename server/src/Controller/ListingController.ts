import { Request, Response } from "express";
import { validateListingCreation } from "../lib/validate";
import { APIError } from "../middleware/errorHandler";
import ListModel from "../Model/ListModel";
import { Types } from "mongoose";
import UserModel from "../Model/UserModel";

async function createListing(req: Request, res: Response) {
  try {
    const { error } = validateListingCreation(req.body);
    if (error) {
      const msg = error.details[0].message;
      return res.status(400).json({ success: false, message: msg });
    }
    let userId = req.user_!._id;
    await ListModel.create({ ...req.body, userId });
    return res.status(201).json({ success: true, message: "Listing Created" });
  } catch (error) {
    console.log(error);
    throw new APIError("Something went wrong while creting listing", 500);
  }
}

async function getAllList(req: Request, res: Response) {
  const listings = await ListModel.find().sort({ createdAt: "desc" });
  return res.status(200).json({ success: true, listings });
}

async function getListingById(req: Request<{ listId: string }>, res: Response) {
  const listId = req.params?.listId;
  if (!listId || !Types.ObjectId.isValid(listId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Listing Id" });
  }
  const listing = await ListModel.findById(listId).populate("userId");
  if (!listing) {
    return res
      .status(400)
      .json({ success: false, message: "Listing not found" });
  }
  return res.status(200).json({ success: true, listing });
}

async function getFavoriteListings(req: Request, res: Response) {
  const userId = req.user_?._id;
  const user = await UserModel.findById(userId).populate("favoriteIds");
  const listings = user?.favoriteIds;
  return res.status(200).json({ success: true, listings });
}

async function getListingsOfuser(req: Request, res: Response) {
  const userId = req.user_?._id;
  const listings = await ListModel.find({ userId });
  return res.status(200).json({ success: true, listings });
}

async function deleteListingById(
  req: Request<{ listingId: string }>,
  res: Response,
) {
  const userId = req.user_?._id;
  const listingId = req.params?.listingId;
  if (!listingId || !Types.ObjectId.isValid(listingId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Reservation ID" });
  }
  const listing = await ListModel.findById(listingId);
  if (!listing) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Listing ID" });
  }

  if (userId?.toString() == listing?.userId?.toString()) {
    await listing.deleteOne();
    return res.status(200).json({ success: true, message: "Listing deleted" });
  } else {
    return res.status(401).json({
      success: false,
      message: "You don't have permission to delete the Listing",
    });
  }
}

export {
  createListing,
  getAllList,
  getListingById,
  getFavoriteListings,
  getListingsOfuser,
  deleteListingById,
};

declare global {
  namespace Express {
    interface Request {
      user_?: {
        _id: string;
        name: string;
        email: string;
      };
    }
  }
}
