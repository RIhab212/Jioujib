const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("UserInfo");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        userCount++;
        res.status(200).json({ users });

    } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des utilisateurs" });
    }
});

module.exports = router;
