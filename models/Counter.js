// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
  year: { type: Number, required: true }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;