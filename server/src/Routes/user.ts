import express from "express";

import authenticateUser from "../middleware/authMiddleware";
import {
  addListingToFav,
  removeListingFromFav,
} from "../Controller/UserController";
const router = express.Router();

router.post("/addFavroite", authenticateUser, addListingToFav);

router.delete("/removeFavroite", authenticateUser, removeListingFromFav);

export default router;
