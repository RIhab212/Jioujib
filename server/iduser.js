const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = mongoose.model('product');
const UserInfo = mongoose.model('UserInfo');

router.get('/users/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await UserInfo.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;
