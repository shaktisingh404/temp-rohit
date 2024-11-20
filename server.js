// {
//   bcrypt js:- it is used for hash the password,
//   cloudinary: - it is used for upload images,
//   cookieParser:- it is used for get the cookies from the request,
//   dotenv:- it is used for read the file AudioContext,
//   express :- it is used for the server in the first place,
//   ioredis: - connect to obsdash,
//   JsonWebToken:- Authentication in the tokens,
//   mongoose:- it is used for connect with DB and interact with it.
//   stripe:- its is used for the payemnt
// }

// check payment.controller
//command:-
// username:-rohitkumar8106263
// password : - 6IkHQI3dYMa6h9Sa

// control j is used for open terminal in vs code for react PromiseRejectionEvent.

// for clear the terminal use : cls

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});