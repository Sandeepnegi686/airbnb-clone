import express from "express";

import {
  createReservation,
  deleteReservation,
  getReservationsByListingID,
  getReservationsByUserID,
  getReservationsByAuthorId,
} from "../Controller/ReservationController";
const router = express.Router();

router.post("/create", createReservation);

router.get(
  "/get-reservation-by-listingId/:listingId",
  getReservationsByListingID,
);

router.get("/get-reservation-by-userId/:userId", getReservationsByUserID);

router.get("/get-reservation-by-authorId/:authorId", getReservationsByAuthorId);

router.delete("/:reservationId", deleteReservation);

export default router;
