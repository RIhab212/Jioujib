const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const{ validate,Product } = require("./Products");
const jwt = require("jsonwebtoken");
const User = mongoose.model("UserInfo");
const  JWT_SECRET = "ajz&ojozajojdoqjodijaoizjfofoqvnoqsniqosnd17187639217412984OZANOSNCOIU19287931U9DDZJ983J"

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        const userCount = users.length;
        res.status(200).json({ users, count: userCount });
    } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs" });
    }
});
module.exports = router;
