const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

const app = express();
const Product = mongoose.model("product");
const User = mongoose.model("UserInfo","product");
router.get("/", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


module.exports = router;