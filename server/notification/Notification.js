const mongoose = require('mongoose');
const moment = require("moment/moment");
const {bool} = require("joi");

const notificationSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: {type: String, required: true},
    productId: {type: String, required: true},
    seen: {type: Boolean, default: false},
    time: {
        type: Date,
        default: Date.now,
        get: function(v) {
            return moment(v).format('DD-MMM-YYYY, h A');
        }
    },
});

const Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;