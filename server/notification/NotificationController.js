const Notification = require("../notification/Notification");

const fetchNotificationsByUserId = async (req, res) =>{
    const userId = req.params.userId;
    try{
        const notifications = await Notification.find({userId: userId});
        res.json({notifications});
    }
    catch (error) {
        throw error;
    }
}

const createNotification = async (req, res) =>{
    const {text, userId, productId} = req.body;
    try{
        const notification = await Notification.create({
            text,
            userId,
            productId
        });
        res.json({notification});
    } catch (error) {
        throw error;
    }
}

const deleteNotification = async (req, res) => {
    try{
        const notificationId = req.params.notificationId;

        await Notification.findByIdAndDelete(notificationId);
        res.json({success: "Notification deleted"})

    } catch (error){
        throw error;
    }
}

const markAsSeen = async (req, res) => {
    const notificationId = req.params.notificationId;

    try {
        const notification = await Notification.findById(notificationId);

        notification.seen = true;

        await notification.save();
        res.json({success: "Notification updated"})

    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchNotificationsByUserId,
    createNotification,
    deleteNotification,
    markAsSeen,
}