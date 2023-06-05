const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = mongoose.model("UserInfo");


router.get("/", async (req, res) => {
    const { fname, lname, email, password, gender } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
            gender,
        });
        userCount++;
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating user" });
    }

});
module.exports = router;
