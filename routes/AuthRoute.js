const express = require('express');
const User = require('../models/User');  // Import product model
const router = express.Router();

// Route: Lấy tất cả sản phẩm
router.get('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.find({ username: username }, function (err, docs) {
            if (err){
                console.log(err);
            }
            return docs
        });

        if (user && user.password === password) {
            res.status(200).json(books);
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const newUser = new User({ name, username, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;