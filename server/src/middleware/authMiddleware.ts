import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

interface AuthPayload extends JwtPayload {
  _id: string;
  name: string;
  email: string;
}

function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req?.cookies?.["access-token"];
    if (!authHeader) {
      return res.status(401).json({ s: false, m: "unauthorized" });
    }
    const token = authHeader;
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    req.user_ = {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ s: false, m: "unauthorized" });
  }
}

export default authenticateUser;
