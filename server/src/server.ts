import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./Config/connectDB";
require("dotenv").config();

const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use(helmet());

const PORT = process.env.PORT || 80;
const DB_URL = process.env.DB_URL || "";

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
