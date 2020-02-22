import mongoose from 'mongoose';

const menus = mongoose.Schema({
  dishName: String,
  dishNum: Number,
  dishType: String,
});

const appletMenu = mongoose.model('appletMenu', menus);

export default appletMenu; 