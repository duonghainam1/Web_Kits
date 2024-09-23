import Notification from "../../models/Notification/Notification";
import { StatusCodes } from 'http-status-codes';
import User from "../../models/Auth/users";
export const createNotification = async (req, res) => {
    try {
        const { userId, message, different } = req.body;
        let { receiver_id } = req.body;
        const user = await User.findOne({ email: receiver_id });
        if (user) {
            receiver_id = user._id
        }
        const notification = new Notification({
            userId,
            receiver_id,
            message,
            different,
        });
        await notification.save();
        res.status(201).json({ message: "Tạo thành công", notification });
    } catch (error) {
        res.status(500).json({ message: "Lỗi rồi đại ca ơi" });
    }
}

export const getNotificationByUser = async (req, res) => {
    try {
        const receiver_id = req.params.userId;
        if (!receiver_id) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No User'
            })
        }
        const notifications = await Notification.find({ receiver_id }).sort({ datetime: -1 }).populate('userId');
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Lỗi rồi đại ca ơi" });
    }
}
export const getAllNotification = async (req, res) => {
    const { userId, role } = req.query;
    try {
        let notifications
        if (role === 'admin') {
            notifications = await Notification.find().sort({ datetime: -1 }).populate('userId');
        } else if (userId) {
            notifications = await Notification.find({ receiver_id: userId }).sort({ datetime: -1 }).populate('userId');
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'Unauthorized'
            });
        }
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Lỗi rồi đại ca ơi" });
    }
}