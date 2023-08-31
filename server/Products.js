const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const multer = require('multer');
const express = require('express');
const app = express();
const moment = require('moment');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const User = mongoose.model("UserInfo");


const userSchema = new mongoose.Schema({
	location: { type: String, required: true },
	productName: { type: String, required: true },
	description: { type: String, required: true },
	photo: { type: String, required: true },
	isConfirmed: { type: Boolean, default: false },
	Notif : { type: Boolean, default: true },
	userId : {type:Number , required: true},
	status : { type: String, default: null},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function(v) {
			return moment(v).format('DD-MMM-YYYY, h A');
		}
	},

	confirmedAt: { type: Date },
	pickupDate: { type: Date },
	DelivredDate :{ type: Date },

});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
const Product =  mongoose.model("product", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		location: Joi.string().required().label(" location"),
		productName: Joi.string().required().label("productName"),
		description: Joi.string().required().label("description"),
		status: Joi.string().required().label("description"),
		photo: Joi.string().optional().allow(""),
		userId: Joi.number().required().label("user")



	});
	return schema.validate(data);
};


module.exports = { Product, validate };
