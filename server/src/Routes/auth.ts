import express, { Request, Response } from "express";
import { signUp, login } from "../Controller/AuthController";
import UserModel from "../Model/UserModel";
import authenticateUser from "../middleware/authMiddleware";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

router.post("/signup", signUp);

router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}`,
    session: false,
  }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    const user = req.user as any;
    const data = { _id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(data, JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // 1 day
    });
    const url = `${CLIENT_URL}/auth-successfull?access-token=${token}`;
    return res.redirect(url);
  },
);

router.get("/me", authenticateUser, async (req: Request, res: Response) => {
  if (!req.user_) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
  const user = await UserModel.findById((req.user_ as any)._id);
  return res.status(200).json({ success: true, user });
});

router.post(
  "/me",
  async (req: Request<{}, {}, { token: string }>, res: Response) => {
    const token = req.body.token;
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.status(200).json({ success: true });
  },
);

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
