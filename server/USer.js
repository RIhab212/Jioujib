const express = require("express")
const app = express()
const mongoose = require("mongoose")
const router = express.Router()
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const http = require("http");
const { Server } = require("socket.io");
app.use(express.json())
const cors = require("cors")
app.use(cors())
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const JWT_SECRET = "ajz&ojozajojdoqjodijaoizjfofoqvnoqsniqosnd17187639217412984OZANOSNCOIU19287931U9DDZJ983J"

const mongoUrl = "mongodb+srv://Sofbt:dofy4mzVHYhdgE43@cluster0.d7u6cqi.mongodb.net/?retryWrites=true&w=majority"

mongoose
    .connect(mongoUrl)
    .then((e) => console.log("Connected to database"))
    .catch((error) => console.error(error));


require("./userDetails")
require("./Products")
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
