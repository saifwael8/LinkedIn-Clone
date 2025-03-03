import Notification from '../models/notification.model.js';

export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recepient: req.user._id }).sort({ createdAt: -1 })
        .populate("relatedUser", "name username profilePicture")
        .populate("relatedPost", "content images")

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getUserNotifications",error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const notification = await Notification.findByIdAndUpdate(
            {_id: notificationId, recepient: req.user._id},
            {read: true},
            {new: true}
        )
        res.json(notification);
    
    } catch (error) {
        console.log("Error in markNotificationAsRead controller",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        await Notification.findOneAndDelete({
            _id: notificationId,
            recepient: req.user._id,
        });
        res.json({ message: "Notification deleted successfully" });
    }catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}