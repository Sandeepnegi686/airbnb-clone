import express from "express";
import {
  createListing,
  deleteListingById,
  getAllList,
  getFavoriteListings,
  getListingById,
  getListingsOfuser,
} from "../Controller/ListingController";
import authenticateUser from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", authenticateUser, createListing);

router.get("/getAllListing", getAllList);

router.get("/getAllListingOfUser", authenticateUser, getListingsOfuser);

router.get("/getFavoriteListings", authenticateUser, getFavoriteListings);

router.get("/getListingById/:listId", getListingById);

router.delete("/:listingId", authenticateUser, deleteListingById);

export default router;
