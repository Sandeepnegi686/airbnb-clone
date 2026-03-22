import express from "express";
import { createListing, getAllList } from "../Controller/ListingController";
import authenticateUser from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", authenticateUser, createListing);

router.get("/getAllListing", getAllList);

export default router;
