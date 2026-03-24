import express from "express";
import authenticateUser from "../middleware/authMiddleware";
import { createReservation } from "../Controller/ReservationController";
const router = express.Router();

router.post("/create", authenticateUser, createReservation);

export default router;
