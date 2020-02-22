import mongoose from 'mongoose';

const menus = mongoose.Schema({ 
  dishName: String,
  dishNum: Number,
  dishType: String,
});

const dayMenus = mongoose.model('dayMenu', menus);
 
export default dayMenus; 