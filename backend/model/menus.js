import mongoose from 'mongoose';

const menus = mongoose.Schema({
  key: Number,
  dishName: String,
  dishType: String,
  inventory: Number,
  createdTime: Date,
  selectedNums: Number,
  sparedNums: Number,
  morning: Number,
  noon: Number,
  night: Number,
});

const Menus = mongoose.model('menu', menus);

export default Menus;