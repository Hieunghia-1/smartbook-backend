const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');

// Route: Lấy tất cả sản phẩm
router.get('/users', async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route: Thêm mới sản phẩm
router.post('/users', async (req, res) => {
    const { fullname, username, password, email, phone } = req.body;

    try {
        const newUser = new User({ fullname, username, password, email, phone });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, username, password, email, phone } = req.body;

    try {
        let findUser = await User.findOne({_id : id});
        if (password.trim() !== '') {
            findUser.password = password;
        }
        findUser.fullname = fullname;
        findUser.email = email;
        findUser.phone = phone;
        findUser.username = username;
        const user = await findUser.save()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: Xóa sản phẩm
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;