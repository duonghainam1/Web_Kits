import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connect";
import Routes_Products from "./routers/products";
import Routes_categories from "./routers/category";
import Routes_orders from "./routers/orders";
import Routes_auth from "./routers/auth";
import Routes_blog from "./routers/blogs";
import Routes_Favorites from "./routers/favoriteProducts";
import Routes_Carts from "./routers/cart";
import Router_Contact from "./routers/contact";
import Routes_payments from "./routers/OnlineCheckoutRoutes";
import Routes_Attribute from "./routers/attribute";
import Routes_review from "./routers/review";
import Router_Notification from "./routers/notification";
import Route_Shipper from "./routers/shipper";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());



connectDB(process.env.DB_URL);

app.use("/api/v1", Routes_Products);
app.use("/api/v1", Routes_Attribute);
app.use("/api/v1", Routes_categories);
app.use("/api/v1", Routes_orders);
app.use("/api/v1", Routes_Carts);
app.use("/api/v1", Routes_auth);
app.use("/api/v1", Routes_Favorites);
app.use("/api/v1", Router_Notification);
app.use("/api/v1", Router_Contact);
app.use("/api/v1", Routes_blog);
app.use("/api/v1", Routes_payments);
app.use("/api/v1", Routes_review);
app.use("/api/v1", Route_Shipper);
app.get("/profile/allorder", (req, res) => {
  const amount = req.query.vnp_Amount;
  const responseCode = req.query.vnp_ResponseCode;
  const txnRef = req.query.vnp_TxnRef;
  console.log("Amount: ", amount);
  console.log("Response Code: ", responseCode);
  console.log("Transaction Reference: ", txnRef);
  if (responseCode === "00") {
    res.send("Transaction successful");
  } else {
    res.send("Transaction failed");
  }
});
export const viteNodeApp = app;
