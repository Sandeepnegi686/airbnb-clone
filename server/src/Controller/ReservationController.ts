import { Request, Response } from "express";
import { validateReservationListing } from "../lib/validate";
import { APIError } from "../middleware/errorHandler";
import ReservationModel from "../Model/ReservationModel";
import ListModel from "../Model/ListModel";

async function createReservation(req: Request, res: Response) {
  try {
    const { error } = validateReservationListing(req.body);
    if (error) {
      const msg = error.details[0].message;
      return res.status(400).json({ success: false, message: msg });
    }
    let userId = req.user_!._id;
    const reservation = await ReservationModel.create({ ...req.body, userId });
    await ListModel.findByIdAndUpdate(
      req.body.listingId,
      { $push: { reservations: reservation._id } },
      { new: true },
    );
    return res
      .status(201)
      .json({ success: true, message: "Reservation Created" });
  } catch (error) {
    console.log(error);
    throw new APIError("Something went wrong while creting reservation", 500);
  }
}

async function getReservations(
  req: Request<{}, {}, { listingId: string; userId: string; authorId: string }>,
  res: Response,
) {
  let reservations: any = [];
  const listingId = req.body?.listingId;
  const userId = req.body?.userId;
  const authorId = req.body?.authorId;
  if (listingId) {
    reservations = await ReservationModel.find({ listingId }).sort({
      createdAt: "desc",
    });
  } else if (userId) {
    reservations = await ReservationModel.find({ userId }).sort({
      createdAt: "desc",
    });
  } else if (authorId) {
    let listings = await ListModel.find({ userId: authorId }).sort({
      createdAt: "desc",
    });
    console.log(listings);
  }
  return res.status(200).json({ success: true, reservations });
}

export { createReservation, getReservations };

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
