import express, { Request, Response } from "express";
import { signUp, login } from "../Controller/AuthController";
import UserModel from "../Model/UserModel";
import authenticateUser from "../middleware/authMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        name: string;
      };
    }
  }
}

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/me", authenticateUser, async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
  const user = await UserModel.findById(req.user._id);
  return res.status(200).json({ success: true, user });
});

router.delete("/logout", async (req: Request, res: Response) => {
  res.cookie("access-token", "", {
    expires: new Date(0),
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "none" as const,
    path: "/",
  });
  return res.status(200).json({ success: true });
});

export default router;
