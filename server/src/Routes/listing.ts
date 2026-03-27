import express from "express";
import {
  createListing,
  getAllList,
  getFavoriteListings,
  getListingById,
} from "../Controller/ListingController";
import authenticateUser from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", authenticateUser, createListing);

router.get("/getAllListing", getAllList);

router.get("/getFavoriteListings", authenticateUser, getFavoriteListings);

router.get("/getListingById/:listId", getListingById);

export default router;
