import { Request, Response } from "express";
import { validateReservationListing } from "../lib/validate";
import { APIError } from "../middleware/errorHandler";
import ReservationModel from "../Model/ReservationModel";

async function createReservation(req: Request, res: Response) {
  try {
    const { error } = validateReservationListing(req.body);
    if (error) {
      const msg = error.details[0].message;
      return res.status(400).json({ success: false, message: msg });
    }
    let userId = req.user_!._id;
    await ReservationModel.create({ ...req.body, userId });
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
  let reservations = [];
  const listingId = req.body?.listingId;
  const userId = req.body?.userId;
  const authorId = req.body?.authorId;
  if (listingId) {
    reservations = await ReservationModel.find({ listingId }).sort({
      createdAt: "desc",
    });
  }
  return res.status(200).json({ success: true, reservations });
}

// async function getListingById(req: Request<{ listId: string }>, res: Response) {
//   const listId = req.params?.listId;
//   if (!listId || !Types.ObjectId.isValid(listId)) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid Listing Id" });
//   }
//   const listing = await ListModel.findById(listId).populate("userId");
//   if (!listing) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Listing not found" });
//   }
//   return res.status(200).json({ success: true, listing });
// }

export { createReservation };

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
