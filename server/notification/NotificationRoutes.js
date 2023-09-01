const express = require('express');
const router = express.Router();
const notificationController = require("../notification/NotificationController")

router.get("/", notificationController.fetchNotificationsByUserId);
router.post("/", notificationController.createNotification);
router.delete("/:notificationId", notificationController.deleteNotification);
router.put("/:notificationId", notificationController.markAsSeen);

module.exports = router;