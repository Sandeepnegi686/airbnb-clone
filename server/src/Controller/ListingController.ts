import { Request, Response } from "express";
import { validateListingCreation } from "../lib/validate";
import { APIError } from "../middleware/errorHandler";
import ListModel from "../Model/ListModel";
import { Schema, Types } from "mongoose";

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

export { createListing, getAllList };

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
