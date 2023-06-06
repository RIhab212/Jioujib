const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

const app = express();
const Product = mongoose.model("product");
const User = mongoose.model("UserInfo","product");

router.get("/", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const orderPlacedCount = await Product.countDocuments({ status: "ORDER_PLACED" });
        const orderAcceptedCount = await Product.countDocuments({ status: "ORDER_ACCEPTED" });
        const pickupOrderCount = await Product.countDocuments({ status: "ORDER_PICKUP" });
        const orderDeliveredCount = await Product.countDocuments({ status: "ORDER_DELIVERED" });

        const totalCount = await Product.countDocuments(); // Nombre total de commandes

        return res.json({
            count: {
                orderPlacedCount,
                orderAcceptedCount,
                pickupOrderCount,
                orderDeliveredCount,
                totalCount // Ajout du nombre total de commandes
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports = router;