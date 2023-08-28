const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const session = require('express-session');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://rihab212.github.io",
        methods: ["GET", "POST"],
    },
});

const JWT_SECRET = "ajz&ojozajojdoqjodijaoizjfofoqvnoqsniqosnd17187639217412984OZANOSNCOIU19287931U9DDZJ983J";

const mongoUrl = "mongodb+srv://Sofbt:dofy4mzVHYhdgE43@cluster0.d7u6cqi.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(mongoUrl)
    .then((e) => console.log("Connected to database"))
    .catch((error) => console.error(error));

app.use(express.json());
app.use(cors());

require("./userDetails");
require("./Products");

const getProducts = require('./getProducts');
app.use('/api/getproducts', getProducts);
const form = require('./form')
app.use('/api/form', form)

const USer = require('./USer');
app.use('/api/users', USer);

app.use('/uploads', express.static('./form'));
const status = require('./status');
app.use('/api/status', status);
const Prod = require('./Prod');
app.use('/api/Prod', Prod);
const sess = require('./session');
app.use('/api/session', sess);

const User = mongoose.model("UserInfo");
const Product =  mongoose.model("product")

app.post("/register", async (req, res) => {
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
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating user" });
    }

});


router.put("server/api/update", async(req ,res) => {
  try {
      const confirmed = await Product.findByIdAndUpdate({_id: req.body._id}, { isConfirmed: true } )
      if (!confirmed) {
          return res.status(404).send('User not found')
      }
      res.send('Product confirmed')
  } catch (error) {
      console.log(error)
      return res.status(500).send('Error updating document')
  }

})







app.post("/userData", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
    const { token } = req.body

    try {
        const user = jwt.verify(token, JWT_SECRET)
        const useremail = user.email
        User.findOne({email : useremail}).then((data) => {
            res.send({ status: "ok", data: data })
        }).catch((error) => {
            res.send({status: "error", data: error})
        })
    } catch (error) {

    }

})
app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.send('User is logged in');
    } else {
        res.status(401).send('User is not logged in');
    }
});


app.post("/userProducts", async (req, res) => {
    const { token } = req.body

    try {
        const user = jwt.verify(token, JWT_SECRET)
        const ProductName = user.ProductName
        Product.find({ProductName : ProductName})
            .then((data) => {
                res.send({ status: "ok", data: data })
            }).catch((error) => {
            res.send({status: "error", data: error})
        })
    } catch (error) {

    }
})





io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });
});
module.exports = router;

const port = process.env.PORT || 10000;
server.listen(port, () => console.log(`Server listening on port ${port}`));