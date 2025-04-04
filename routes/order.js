const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const auth = require('../middlewares/auth');

// Route: Lấy tất cả đơn hàng (admin)
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('customer', 'phone email') 
        .populate('orderDetails.product', 'name price'); 
        res.status(200).json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route: Tạo đơn hàng mới (user)
router.post('/orders', auth, async (req, res) => {
    const { items, payment, userId } = req.body;

    try {
        let total = 0;
        items.forEach(element => {
            total += element.quantity * element.price
        });
        const newOrder = new Order({
            orderDetails: items,
            customer: userId,
            totalPrice: total,
            paymentMethod: payment
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: Cập nhật trạng thái đơn hàng (admin)
router.put('/orders/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: Xóa đơn hàng (optional - có thể dùng khi testing)
router.delete('/orders/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route: Tìm đơn hàng theo mã (search)
router.post('/orders/search', async (req, res) => {
    const { q } = req.body;

    try {
        const order = await Order.findOne({ _id: q });
        res.status(200).json({ order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
