const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true }); // Tự động thêm thời gian tạo và cập nhật

// Tạo model từ schema
const User = mongoose.model('Users', productSchema);

module.exports = User;