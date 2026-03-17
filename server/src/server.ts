import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./Config/connectDB";
import authRoute from "./Routes/auth";
import { errorHandler } from "./middleware/errorHandler";
require("dotenv").config();

const PORT = process.env.PORT || 80;
const DB_URL = process.env.DB_URL || "";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(helmet());

//request logger
app.use(function (req, res, next) {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

app.get("/", (_: Request, res: Response) => res.send("hello from Ts - node"));

app.use("/api/v1/auth", authRoute);

app.use(errorHandler);

async function startServer() {
  try {
    await connectDB(DB_URL)
      .then(() => console.log("Database Connected"))
      .catch((e) => console.log(e));
    app.listen(PORT, () => {
      console.log(`Server Started at port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
