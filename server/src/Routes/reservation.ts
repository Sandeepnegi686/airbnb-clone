import express from "express";
import authenticateUser from "../middleware/authMiddleware";
import {
  createReservation,
  getReservations,
} from "../Controller/ReservationController";
const router = express.Router();

router.post("/create", authenticateUser, createReservation);

router.get("/get-reservation", authenticateUser, getReservations);

export default router;
