import mongoose from 'mongoose';

const orders = mongoose.Schema({
  dishName: String,
  soldOut: Number,
  morning: Number,
  noon: Number,
  night: Number,
  dateTime: Date,
});

const dayOrders = mongoose.model('dayOrder', orders);
export default dayOrders;