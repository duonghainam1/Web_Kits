import { Router } from "express";
import { createNotification, getAllNotification, getNotificationByUser } from "../controllers/Notification/notification";

const router = Router();
router.post("/notification", createNotification);
router.get("/notification/:userId", getNotificationByUser);
router.get("/notification/", getAllNotification);
export default router