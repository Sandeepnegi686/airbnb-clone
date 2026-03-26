import { Request, Response } from "express";
import { validateReservationListing } from "../lib/validate";
import { APIError } from "../middleware/errorHandler";
import ReservationModel from "../Model/ReservationModel";
import ListModel from "../Model/ListModel";
import { Types } from "mongoose";

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
      { returnDocument: "after" },
    );
    return res
      .status(201)
      .json({ success: true, message: "Reservation Created" });
  } catch (error) {
    console.log(error);
    throw new APIError("Something went wrong while creting reservation", 500);
  }
}

async function getReservationsByListingID(
  req: Request<{ listingId: string }>,
  res: Response,
) {
  // let reservations: any = [];
  const listingId = req.params?.listingId;
  // const userId = req.body?.userId;
  // const authorId = req.body?.authorId;
  // if (listingId) {
  if (!listingId || !Types.ObjectId.isValid(listingId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Listing ID" });
  }
  const reservations = await ReservationModel.find({ listingId }).sort({
    createdAt: "desc",
  });
  if (reservations.length === 0) {
    return res
      .status(200)
      .json({ success: false, message: "Cannot find reservations" });
  }
  return res.status(200).json({ success: true, reservations });
  // }
  // else if (userId) {
  //   reservations = await ReservationModel.find({ userId }).sort({
  //     createdAt: "desc",
  //   });
  // } else if (authorId) {
  //   let listings = await ListModel.find({ userId: authorId })
  //     .populate("reservations")
  //     .sort({
  //       createdAt: "desc",
  //     });
  //   reservations = listings.map((listing) =>
  //     listing.reservations.map((reservation) => reservation),
  //   );
  // }
}

async function getReservationsByUserID(
  req: Request<{ userId: string }>,
  res: Response,
) {
  const userId = req.params?.userId;
  if (!userId || !Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Listing ID" });
  }
  const reservations = await ReservationModel.find({ userId })
    .populate("listingId")
    .sort({
      createdAt: "desc",
    });
  if (reservations.length === 0) {
    return res
      .status(200)
      .json({ success: false, message: "Cannot find reservations" });
  }
  return res.status(200).json({ success: true, reservations });
}

async function deleteReservation(
  req: Request<{ reservationId: string }>,
  res: Response,
) {
  const userId = req.user_?._id;
  const reservationId = req.params?.reservationId;
  if (!reservationId || !Types.ObjectId.isValid(reservationId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Reservation ID" });
  }
  const reservation = await ReservationModel.findOne({
    _id: reservationId,
  }).populate("listingId");
  if (!reservation) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Reservation ID" });
  }
  const listing = reservation.listingId as any;
  if (
    userId?.toString() == reservation?.userId?.toString() ||
    userId?.toString() == listing.userId?.toString()
  ) {
    await reservation.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Reservation deleted" });
  } else {
    return res.status(401).json({
      success: false,
      message: "You don't have permission to delete the reservation",
    });
  }
}

export {
  createReservation,
  getReservationsByListingID,
  getReservationsByUserID,
  deleteReservation,
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
