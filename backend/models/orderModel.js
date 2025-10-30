const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order_no: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now
  },
}, { timestamps: true }); 

module.exports = mongoose.model('Order', orderSchema);

/*
const orderSchema = new Schema({
  order_no: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  pickup_date: {
    type: Date
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  type: {
    type: String,
    enum: ['Fixed', 'Custom'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Reserved', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  total_amount: {
    type: Number,
    required: true,
    default: 0.0
  },
  created_by: {
    type: String,
    required: true,
    maxlength: 50
  }
}, { timestamps: true }); 
*/