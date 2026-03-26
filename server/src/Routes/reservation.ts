import express from "express";
import authenticateUser from "../middleware/authMiddleware";
import {
  createReservation,
  deleteReservation,
  getReservationsByListingID,
  getReservationsByUserID,
} from "../Controller/ReservationController";
const router = express.Router();

router.post("/create", createReservation);

// router.get("/get-reservation", authenticateUser, getReservations);

router.get(
  "/get-reservation-by-listingId/:listingId",
  getReservationsByListingID,
);

router.get("/get-reservation-by-userId/:userId", getReservationsByUserID);

router.delete("/:reservationId", deleteReservation);

export default router;
