import express, { Request, Response } from "express";
import { signUp, login } from "../Controller/AuthController";
// import authenticateUser from "../middleware/authMiddleware";
import UserModel from "../Model/UserModel";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

export default router;
