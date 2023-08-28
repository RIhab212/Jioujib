const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const crypto = require("crypto");
const router = express.Router();
const app = express();
const secretKey = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));
app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const admin = await User.findOne({ email, isAdmin: true });

    if (admin) {
        if (await bcrypt.compare(password, admin.password)) {
            // Stocker les informations de l'utilisateur dans la session
            req.session.user = { id: admin._id, email: admin.email, isAdmin: true };
            const token = jwt.sign({ email: admin.email }, secretKey);
            return res.json({ status: "admin logged in", data: token });
        }
    } else {
        if (!user) {
            return res.json({ error: "User Not Found" });
        }
        if (await bcrypt.compare(password, user.password)) {
            // Stocker les informations de l'utilisateur dans la session
            req.session.user = { id: user._id, email: user.email, isAdmin: false };
            const token = jwt.sign({ email: user.email }, secretKey);
            let avatarUrl;
            if (user.gender === "male") {
                avatarUrl = "/male-avatar.png";
            } else if (user.gender === "female") {
                avatarUrl = "/female-avatar.png";
            }
            return res.json({
                status: "user logged in",
                data: token,
                gender: user.gender,
                avatar: avatarUrl,
            });
        }
    }

    res.json({ status: "error", error: "Invalid Password" });
});
app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.send('User is logged in');
    } else {
        res.status(401).send('User is not logged in');
    }
});
