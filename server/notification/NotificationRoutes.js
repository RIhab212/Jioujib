const express = require('express');
const router = express.Router();
const notificationController = require("../notification/NotificationController")

router.get("/:userId", notificationController.fetchNotificationsByUserId);
router.post("/", notificationController.createNotification);
router.delete("/:notificationId", notificationController.deleteNotification);
router.put("/update/:notificationId", notificationController.markAsSeen);

module.exports = router;