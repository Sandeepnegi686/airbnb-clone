import express from "express";
import authenticateUser from "../middleware/authMiddleware";
import {
  createReservation,
  getReservationsByListingID,
  getReservationsByUserID,
} from "../Controller/ReservationController";
const router = express.Router();

router.post("/create", authenticateUser, createReservation);

// router.get("/get-reservation", authenticateUser, getReservations);

router.get(
  "/get-reservation-by-listingId/:listingId",
  authenticateUser,
  getReservationsByListingID,
);

router.get(
  "/get-reservation-by-userId/:userId",
  authenticateUser,
  getReservationsByUserID,
);

export default router;
