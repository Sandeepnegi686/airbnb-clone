import express from "express";
import {
  createListing,
  getAllList,
  getListingById,
} from "../Controller/ListingController";
import authenticateUser from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", authenticateUser, createListing);

router.get("/getAllListing", getAllList);

router.get("/getListingById/:listId", getListingById);

export default router;
