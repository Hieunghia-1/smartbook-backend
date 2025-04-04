const mongoose = require('mongoose');
const Counter = require('./Counter');
const Schema = mongoose.Schema;

// Define the Order schema
const orderSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  orderDetails: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery', 'Bank Transfer', 'Other'],
    default: 'Credit Card'
  },
  status: {
    type: String,
    enum: ['Đã giao', 'Đang giao', 'Đã hủy', 'Chờ xác nhận'],
    default: 'Chờ xác nhận'
  }
}, { timestamps: true });

// Pre-save hook to generate order name
orderSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const currentYear = new Date().getFullYear();

  try {
    // Find or create counter for current year
    const counter = await Counter.findOneAndUpdate(
      { name: 'order', year: currentYear },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    // Format the order number with leading zeros
    const sequenceNumber = counter.count.toString().padStart(3, '0');
    this.name = `ORD-${currentYear}-${sequenceNumber}`;

    next();
  } catch (err) {
    next(err);
  }
});


// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;