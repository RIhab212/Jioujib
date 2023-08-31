 const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const{ validate,Product } = require("./Products");
const jwt = require("jsonwebtoken");
const User = mongoose.model("UserInfo");
const  JWT_SECRET = "ajz&ojozajojdoqjodijaoizjfofoqvnoqsniqosnd17187639217412984OZANOSNCOIU19287931U9DDZJ983J"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    cb(null, timestamp + '-' + file.originalname);
  }
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
  }
};

// Set up multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit file size to 5MB
  },
  fileFilter: fileFilter
});


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        throw new Error('User not found');
      }

      req.email = user.email; // stocker l'email dans l'objet de requête
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header not found' });
  }
};
 router.get("/userData", authMiddleware, async (req, res) => {
   try {
     const useremail = req.email; // Use the logged-in user's email
     const userData = await User.findOne({ email: useremail });

     if (!userData) {
       res.send({ status: "error", data: "User not found" });
     } else {
       const products = await Product.find({ email: useremail });
       res.send({ status: "ok", data: { user: userData, products: products } });
     }
   } catch (error) {
     res.send({ status: "error", data: error.message });
   }
 });

 router.post("/", authMiddleware , upload.single('photo'), async (req, res) => {
   try {
     const { error } = validate(req.body);
     if (error) {
       return res.status(400).json({ message: error.details[0].message });
     }

     const { location, productName, description, photo, status , userId} = req.body;
     const newProduct = new Product({
       location,
       productName,
       description,
       photo,
       status,
       userId,
     });

     await newProduct.save();
     commandeCount++;
     res.status(201).json({
       message: 'Product created successfully',
       data: newProduct,
     });
   } catch (error) {
     console.log(error);
     res.status(500).json({
       message: 'Product created successfully',
     });
   }
 });


router.get('/:userId',async (req,res) => {
  const userId = req.params.userId;
  try{
    const products = await Product.find({userId});
    res.json(products);
  } catch (error) {
    res.status(500).json({error: 'An error occurred'});
  }

});
router.get('/', (req, res) => {
  Product.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              location: doc.location,
              productName: doc.productName,
              description: doc.description,
              photo: doc.photo,
              _id: doc._id
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
});



module.exports = router;